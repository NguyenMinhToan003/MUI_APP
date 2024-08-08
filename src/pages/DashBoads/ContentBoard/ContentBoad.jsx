import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import mapOrder from '../../../utils/Mapping';
import { cloneDeep } from 'lodash';
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	TouchSensor,
	MouseSensor,
	useSensor,
	useSensors,
	closestCorners,
	defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Columns/Column/Column';
import Card from './Columns/Column/Cards/Card/Card';
import { FormatOverlineOutlined } from '@mui/icons-material';

const DRAGG_TYPE = {
	COLUMN: 'DRAGG_TYPE_COLUMN',
	CARD: 'DRAGG_TYPE_CARD',
};

const ContentBoard = ({ board }) => {
	const [columnsOrder, setColumnsOrder] = useState([]);
	const [draggingData, setDraggingData] = useState(null);
	const [draggingType, setDraggingType] = useState(null);
	const [draggingId, setDraggingId] = useState(null);
	const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null);
	const findColumnByCardID = (cardId) => {
		return columnsOrder.find((column) =>
			column.cards.find((card) => card._id === cardId)
		);
	};
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: { distance: 15 },
	});
	// chuot di chuyen 15px moi bat dau keo ,
	//* phai dung CSS touchAction: 'none' de khong bi cuon trang khi keo
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: { distance: 15 },
	});
	// nhan du 200ms moi bat dau keo
	const mouseSensor = useSensor(MouseSensor, { delay: 200, tolerance: 5 });
	const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

	useEffect(() => {
		setColumnsOrder(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
	}, [board]);
	// ham tinh toan khi keo tha card giua hai column khac nhau
	const setColumnsOrderWhhenDraggingBewteenColumn = (
		active,
		over,
		activeColumn,
		overColumn,
		overCardIndex
	) => {
		setColumnsOrder((prevColumns) => {
			const isBelowOverItem =
				active.rect.current.translated &&
				active.rect.current.translated.top > over.rect.top + over.rect.height;
			// kiem tra xem co dang keo qua card khac khong
			const modifier = isBelowOverItem ? 1 : 0;
			// tim vi tri cua card tha vao trong column
			let newIndex =
				overCardIndex >= 0 ? overCardIndex + modifier : overItems.length + 1;
			const nextColumns = cloneDeep(prevColumns);
			// column keo qua
			const nextActiveColumn = nextColumns.find(
				(i) => i._id === activeColumn._id
			);
			// column tha vao
			const nextOverColumn = nextColumns.find((i) => i._id === overColumn._id);
			// hanh dong khi card keo qua column khac
			if (nextActiveColumn) {
				// xoa card hien tai
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(i) => i._id !== active.id
				);
				nextActiveColumn.columnOrderIds = nextActiveColumn.cards.map(
					(i) => i._id
				);
			}
			// hanh dong khi card tha vao column khac
			if (nextOverColumn) {
				// neu ton tai card thi xoa card do
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(i) => i._id !== active.id
				);
				// them card vao vi tri moi
				nextOverColumn.cards = nextOverColumn.cards.toSpliced(newIndex, 0, {
					...active.data.current,
					columnId: nextOverColumn._id,
				});
				nextOverColumn.columnOrderIds = nextOverColumn.cards.map((i) => i._id);
				console.log(nextOverColumn);
			}
			return nextColumns;
		});
	};
	// xu ly khi keo ra (card/column) , xac dinh kieu (card/column), data, idActive cua phan tu dang keo ra va column cu khi keo ra
	const handlerDragStart = (event) => {
		setDraggingId(event.active.id);
		setDraggingType(
			event.active.data.current.columnId ? DRAGG_TYPE.CARD : DRAGG_TYPE.COLUMN
		);
		setDraggingData(event.active.data.current);
		if (event.active.data.current.columnId) {
			setOldColumnWhenDragging(findColumnByCardID(event.active.id));
		}
	};
	// xu ly trong qua trinh keo tha CARDS khac column
	const handlerDragOver = (event) => {
		const { active, over } = event;
		if (draggingType === DRAGG_TYPE.COLUMN) return;
		if (!active || !over) return;
		// tim column keo ra
		const activeColumn = findColumnByCardID(active.id);
		// tim column tha vao
		const overColumn = findColumnByCardID(over.id);
		if (!activeColumn || !overColumn) return;
		if (activeColumn?._id === overColumn?._id) return;
		// tim vi tri cua card duoc tha trong column
		const overCardIndex = overColumn.cards.findIndex((i) => i._id === over.id);
		setColumnsOrderWhhenDraggingBewteenColumn(
			active,
			over,
			activeColumn,
			overColumn,
			overCardIndex
		);
	};
	const handlerDragEnd = (event) => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;
		if (draggingType === DRAGG_TYPE.COLUMN) {
			const activeIndex = columnsOrder.findIndex((i) => i._id === active.id);
			const overIndex = columnsOrder.findIndex((i) => i._id === over.id);
			const newColumnOrder = arrayMove(columnsOrder, activeIndex, overIndex);
			// const newColumnOrderIds = newColumnOrder.map((i) => i._id);// dang de danh
			setColumnsOrder(newColumnOrder);
		} else if (draggingType === DRAGG_TYPE.CARD) {
			// phai su dung oldColumnWhenDragging ( khong dung active.columnId vi no da thay doi khi keo qua column khac <ham handlerDragOver>)
			if (oldColumnWhenDragging?._id === over.id) return;
			// tim column Keo qua
			const activeColumn = oldColumnWhenDragging;
			// tim column tha vao
			const overColumn = findColumnByCardID(over.id);
			const activeCardIndex = oldColumnWhenDragging.cards.findIndex(
				(i) => i._id === draggingId
			);
			const overCardIndex = overColumn.cards.findIndex(
				(i) => i._id === over.id
			);
			// neu keo qua va tha vao cung 1 column
			if (activeColumn._id === overColumn._id) {
				// thay doi vi tri card trong column (Bien luu array card da thay doi khi keo tha )
				const newCardOrder = arrayMove(
					overColumn.cards,
					activeCardIndex,
					overCardIndex
				);
				// cap nhat stateColumnOrder
				setColumnsOrder((prevColumns) => {
					const nextColumns = cloneDeep(prevColumns);
					const nextOverColumn = nextColumns.find(
						(i) => i._id === overColumn._id
					);
					nextOverColumn.cards = newCardOrder;
					nextOverColumn.columnOrderIds = newCardOrder.map((i) => i._id);
					return nextColumns;
				});
			}
			// neu keo qua va tha vao khac column
			if (activeColumn._id !== overColumn._id) {
				setColumnsOrderWhhenDraggingBewteenColumn(
					active,
					over,
					activeColumn,
					overColumn,
					overCardIndex
				);
			}
		}

		setDraggingId(null);
		setDraggingType(null);
		setDraggingData(null);
		setOldColumnWhenDragging(null);
	};
	const handlerAnimation = {
		sideEffect: defaultDropAnimationSideEffects({
			styles: { active: { backgroundColor: 'red' } },
		}),
	};

	return (
		<DndContext
			onDragStart={handlerDragStart}
			onDragOver={handlerDragOver}
			onDragEnd={handlerDragEnd}
			sensors={sensors}
			collisionDetection={closestCorners}>
			<Box
				sx={{
					height: (theme) => theme.trello.boardContentHeight,
					backgroundColor: 'primary.main',
					display: 'flex',
					gap: 3,
					paddingBottom: 1,
					width: '100%',
				}}>
				<Columns columns={columnsOrder} />
				<DragOverlay dropAnimation={handlerAnimation}>
					{draggingType === null && undefined}
					{draggingType === DRAGG_TYPE.COLUMN && (
						<Column column={draggingData} />
					)}
					{draggingType === DRAGG_TYPE.CARD && <Card card={draggingData} />}
				</DragOverlay>
			</Box>
		</DndContext>
	);
};

export default ContentBoard;
