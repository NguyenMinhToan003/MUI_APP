import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import mapOrder from '../../../utils/Mapping';
import { DndContext } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

const ContentBoard = ({ board }) => {
	const [columnsOrder, setColumnsOrder] = useState([]);
	useEffect(() => {
		setColumnsOrder(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
	}, [board]);
	const handlerDragEnd = (event) => {
		console.log(event);
		const { active, over } = event;
		if (!over) return;
		else if (active.id !== over.id) {
			const activeIndex = columnsOrder.findIndex((i) => i._id === active.id);
			const overIndex = columnsOrder.findIndex((i) => i._id === over.id);
			const newColumnOrder = arrayMove(columnsOrder, overIndex, activeIndex);
			// const newColumnOrderIds = newArray.map((i) => i._id);
			setColumnsOrder(newColumnOrder);
		}
	};
	return (
		<DndContext onDragEnd={handlerDragEnd}>
			<Box
				sx={{
					height: (theme) => theme.trello.boardContentHeight,
					backgroundColor: 'primary.main',
					display: 'flex',
					gap: 3,
					paddingBottom: 1,
					width: '100%',
				}}>
				{' '}
				<Columns columns={columnsOrder} />
			</Box>
		</DndContext>
	);
};

export default ContentBoard;
