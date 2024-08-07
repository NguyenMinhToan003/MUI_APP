import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import mapOrder from '../../../utils/Mapping';
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	TouchSensor,
	MouseSensor,
	useSensor,
	useSensors,
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
				// const activeColumn = columnsOrder.findIndex(
				// 	(i) => i._id === active.data.current.columnId
				// );
				// const overColumn = columnsOrder.findIndex(
				// 	(i) => i._id === over.data.current.columnId
				// );
				// const activeIndex = columnsOrder[activeColumn].cards.findIndex(
				// 	(i) => i._id === active.id
				// );
				// const overIndex = columnsOrder[overColumn].cards.findIndex(
				// 	(i) => i._id === over.id
				// );
				// let newColumn = columnsOrder[overColumn];
				// // console.log(newColumn, activeIndex, overIndex);
				// const newCards = arrayMove(newColumn.cards, overIndex, activeIndex);
				// newColumn = {
				// 	...newColumn,
				// 	cards: newCards,
				// };
				// const newColumnsOrder = [...columnsOrder];
				// newColumnsOrder[overColumn] = newColumn;
				// console.log(newColumnsOrder);
				// setColumnsOrder(newColumnsOrder);
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
			onDragEnd={handlerDragEnd}
			sensors={sensors}>
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
