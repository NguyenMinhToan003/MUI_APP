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

const DRAGG_TYPE = {
	COLUMN: 'DRAGG_TYPE_COLUMN',
	CARD: 'DRAGG_TYPE_CARD',
};

const ContentBoard = ({ board }) => {
	const [columnsOrder, setColumnsOrder] = useState([]);
	const [draggingData, setDraggingData] = useState(null);
	const [draggingType, setDraggingType] = useState(null);
	const [draggingId, setDraggingId] = useState(null);
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

	const handlerDragStart = (event) => {
		setDraggingId(event.active.id);
		setDraggingType(
			event.active.data.current.columnId ? DRAGG_TYPE.CARD : DRAGG_TYPE.COLUMN
		);
		setDraggingData(event.active.data.current);
	};
	const handlerDragOver = (event) => {
		const { active, over } = event;
		if (draggingType === DRAGG_TYPE.COLUMN) return;
		if (!active || !over) return;

		const activeColumn = findColumnByCardID(active.id);
		const overColumn = findColumnByCardID(over.id);
		if (!activeColumn || !overColumn) return;
		if (activeColumn._id === overColumn._id) return;
		const activeCardIndex = activeColumn.cards.findIndex(
			(i) => i._id === active.id
		);
		const overCardIndex = overColumn.cards.findIndex((i) => i._id === over.id);
		setColumnsOrder((prevColumns) => {
			// kiem tra xem co dang keo qua card khac khong
			const isBelowOverItem =
				active.rect.current.translated &&
				active.rect.current.translated.top > over.rect.top + over.rect.height;
			const modifier = isBelowOverItem ? 1 : 0;
			let newIndex =
				overCardIndex >= 0 ? overCardIndex + modifier : overItems.length + 1;
			const nextColumns = cloneDeep(prevColumns);
			const nextActiveColumn = nextColumns.find(
				(i) => i._id === activeColumn._id
			);
			const nextOverColumn = nextColumns.find((i) => i._id === overColumn._id);
			// hanh khi keo qua card khac
			if (nextActiveColumn) {
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(i) => i._id !== active.id
				);
				nextActiveColumn.columnOrderIds = nextActiveColumn.cards.map(
					(i) => i._id
				);
			}
			// hanh khi tha qua card khac
			if (nextOverColumn) {
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(i) => i._id !== active.id
				);
				nextOverColumn.cards.splice(newIndex, 0, active.data.current);
				nextOverColumn.columnOrderIds = nextOverColumn.cards.map((i) => i._id);
			}
			return nextColumns;
		});
	};

	const handlerDragEnd = (event) => {
		const { active, over } = event;

		if (!over) return;
		else if (active.id !== over.id) {
			if (draggingType === DRAGG_TYPE.COLUMN) {
				const activeIndex = columnsOrder.findIndex((i) => i._id === active.id);
				const overIndex = columnsOrder.findIndex((i) => i._id === over.id);
				const newColumnOrder = arrayMove(columnsOrder, overIndex, activeIndex);
				setColumnsOrder(newColumnOrder);
			} else if (draggingType === DRAGG_TYPE.CARD) {
			}
		}
		setDraggingId(null);
		setDraggingType(null);
		setDraggingData(null);
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
