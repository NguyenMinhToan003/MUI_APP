import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import { cloneDeep, isEmpty } from 'lodash';
import {
	DndContext,
	DragOverlay,
	// PointerSensor,
	useSensor,
	useSensors,
	closestCorners,
	defaultDropAnimationSideEffects,
	pointerWithin,
	rectIntersection,
	getFirstCollision,
} from '@dnd-kit/core';
import {TouchSensor, MouseSensor} from "../../../custom/Dndkit"
import { createPlaceholderCard } from '../../../utils/Function';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Columns/Column/Column';
import Card from './Columns/Column/Cards/Card/Card';

const DRAGG_TYPE = {
	COLUMN: 'DRAGG_TYPE_COLUMN',
	CARD: 'DRAGG_TYPE_CARD',
};

const ContentBoard = ({ board, createNewColumn, createNewCard, updateMoveColumns,updateMoveCardTheSameColumn}) => {
	const [columnsOrder, setColumnsOrder] = useState([]);
	const [draggingData, setDraggingData] = useState(null);
	const [draggingType, setDraggingType] = useState(null);
	const [draggingId, setDraggingId] = useState(null);
	const lastOverId = useRef(null);
	const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null);
	const findColumnByCardID = (cardId) => {
		return columnsOrder.find((column) =>
			column.cards.find((card) => card._id === cardId)
		);
	};
	// const pointerSensor = useSensor(PointerSensor, {
	// 	activationConstraint: { distance: 15 },
	// });
	// chuot di chuyen 15px moi bat dau keo ,
	//* phai dung CSS touchAction: 'none' de khong bi cuon trang khi keo
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: { distance: 15 },
	});
	// nhan du 200ms moi bat dau keo
	const mouseSensor = useSensor(MouseSensor,{activationConstraint: {delay:250,tolerance:500 }},);
	const sensors = useSensors( mouseSensor, touchSensor);
	useEffect(() => {
		setColumnsOrder(board.columns);
	}, [board]);
	// ham tinh toan khi keo tha card giua hai column khac nhau
	const setColumnsOrderWhhenDraggingBewteenColumn = (
		active,
		over,
		activeColumn,
		overColumn,
		overCardIndex,
		overItems
	) => {
		setColumnsOrder((prevColumns) => {
			const isBelowOverItem =
				active.rect.current.translated &&
				active.rect.current.translated.top > over.rect.top + over.rect.height;
			// kiem tra xem co dang keo qua card khac khong
			const modifier = isBelowOverItem ? 1 : 0;
			// tim vi tri cua card tha vao trong column

			let newIndex =
				overCardIndex >= 0 ? overCardIndex + modifier : overItems?.length + 1;
			const nextColumns = cloneDeep(prevColumns);
			// column keo qua
			const nextActiveColumn = nextColumns.find(
				(i) => i._id === activeColumn._id
			);
			// column tha vao
			const nextOverColumn = nextColumns.find((i) => i._id === overColumn?._id);
			// hanh dong khi card keo qua column khac
			if (nextActiveColumn) {
				// xoa card hien tai
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(i) => i._id !== active.id
				);
				if (isEmpty(nextActiveColumn.cards))
					nextActiveColumn.cards = [createPlaceholderCard(nextActiveColumn)];
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
				// xoa placeholder card neu co
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(i) => !i.FE_PLACEHOLDER_CARD
				);
				nextOverColumn.columnOrderIds = nextOverColumn.cards.map((i) => i._id);
			}
			console.log(nextColumns);
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
		const overItems = overColumn?.cards;
		setColumnsOrderWhhenDraggingBewteenColumn(
			active,
			over,
			activeColumn,
			overColumn,
			overCardIndex,
			overItems
		);
	};
	const handlerDragEnd = async (event) => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;
		if (draggingType === DRAGG_TYPE.COLUMN) {
			const activeIndex = columnsOrder.findIndex((i) => i._id === active.id);
			const overIndex = columnsOrder.findIndex((i) => i._id === over.id);
			const newColumnOrder = arrayMove(columnsOrder, activeIndex, overIndex);
			setColumnsOrder(newColumnOrder);	
			await updateMoveColumns(newColumnOrder);
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
			const overCardIndex = overColumn?.cards.findIndex(
				(i) => i._id === over.id
			);
			// neu keo qua va tha vao cung 1 column
			if (activeColumn?._id === overColumn?._id) {
				console.log("keo trong cung mot column")
				// thay doi vi tri card trong column (Bien luu array card da thay doi khi keo tha )
				const newCardOrder = arrayMove(
					overColumn.cards,
					activeCardIndex,
					overCardIndex
				);
				const newCardOrderIds = newCardOrder.map((i) => i._id);
				// cap nhat stateColumnOrder
				setColumnsOrder((prevColumns) => {
					const nextColumns = cloneDeep(prevColumns);
					const nextOverColumn = nextColumns.find(
						(i) => i._id === overColumn._id
					);
					nextOverColumn.cards = newCardOrder;
					nextOverColumn.columnOrderIds = newCardOrderIds;
					return nextColumns;
				});
				await updateMoveCardTheSameColumn(overColumn._id,newCardOrder,newCardOrderIds);
				
			}


			// neu keo qua va tha vao khac column
			if (activeColumn?._id !== overColumn?._id) {
				const overItems = overColumn?.cards;
				setColumnsOrderWhhenDraggingBewteenColumn(
					active,
					over,
					activeColumn,
					overColumn,
					overCardIndex,
					overItems
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

	const collisionDetectionStrate = useCallback(
		(args) => {
			if (draggingType === DRAGG_TYPE.COLUMN || !draggingType)
				return closestCorners({ ...args });
			// tim diem va cham con tro chuot voi cac element
			const pointerIntersections = pointerWithin(args);
			if (!pointerIntersections?.length > 0) return;
			// const intersections =
			pointerIntersections.length > 0
				? // neu co diem va cham thi dung
				  pointerIntersections
				: rectIntersection(args);
			// tim overId dau tien keo vao
			let overId = getFirstCollision(pointerIntersections, 'id');
			if (overId) {
				const overColumn = columnsOrder.find((i) => i._id === overId);
			if (overColumn) {
					overId = closestCorners({
						...args,
						droppableContainers: args.droppableContainers.filter((element) => {
							return (
								element.id !== overId &&
								overColumn?.columnOrderIds?.includes(element.id)
							);
						}),
					});
					overId = overId[0]?.id;
				}

				// neu co overId thi cap nhat lai lastOverId
				lastOverId.current = overId;
				return [{ id: overId }];
			}
			// neu khong co overId thi tra ve lastOverId
			// muc dic cua lastOverId la khi overId = null thi lastOverId se la gia tri cuoi cung cua overId
			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[columnsOrder]
	);
	return (
		<DndContext
			onDragStart={handlerDragStart}
			onDragOver={handlerDragOver}
			onDragEnd={handlerDragEnd}
			sensors={sensors}
			// collisionDetection={closestCorners}
			collisionDetection={collisionDetectionStrate}>
			<Box
				sx={{
					height: (theme) => theme.trello.boardContentHeight,
					backgroundColor: 'primary.main',
					display: 'flex',
					gap: 3,
					paddingY: 1,
					width: '100%',
				}}>
				<Columns columns={columnsOrder}
					createNewColumn={createNewColumn} 
					createNewCard={createNewCard}/>
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
