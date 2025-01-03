import Container from '@mui/material/Container';
import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard/ContentBoad'; // Corrected import
import { fetchDataBoardAPI } from "../../apis";
import { useEffect, useState } from 'react';
import data from "../../apis/mock-data"
import { createColumnAPI, createCardAPI, updateBoardAPI, updateColumnAPI,moveCardToDifferentColumnsAPI,deleteColumnAPI} from '../../apis';
import { toast } from 'react-toastify';
import {createPlaceholderCard} from '../../utils/Function'
import { isEmpty } from 'lodash';
import mapOrder from "../../utils/Mapping" 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {isEqual} from 'lodash'
const Dashboard = () => { 
	const [board, setBoard] = useState(null);

	const fetchData = async () => {
		const id = '66beef4cf1e35a7c3ebd1e2a';
		const data = await fetchDataBoardAPI(id);
		data.columns = mapOrder(data.columns, data.columnOrderIds, '_id');
		data.columns.forEach((column) => {
			if(isEmpty(column.cards)){
				column.cards = [createPlaceholderCard(column)];
				column.cardOrderIds = [createPlaceholderCard(column)._id];
			}
			else {
				column.cards = mapOrder(column.cards, column.cardOrderIds, '_id');
			}
		});
		setBoard(data); 
	};
	useEffect(() => {
		fetchData();
	}, []);

	const createNewColumn = async (data) => {
		const newColumn = {
			...data,
			boardId: board._id,
		};

		const response = await createColumnAPI(newColumn);
		if(response?._id)
			toast.success('Create column successfully');
		fetchData();
	}
	const createNewCard = async (data) => {
		const newCard = {
			...data,
			boardId: board._id,
		};
		const response = await createCardAPI(newCard);
		if(response?._id)
			toast.success('Create card successfully');
		fetchData();
	}
	const updateMoveColumns = async (columns) => {
		const updateBoard ={...board};
		updateBoard.columns = columns;
		const columnOrderIds = columns.map((i) => i._id);
		setBoard({...updateBoard, columnOrderIds});
		const response = await updateBoardAPI(board._id, {columnOrderIds});
		// if(response?._id)
		// 	toast.success('move column successfully');
	}
	const updateMoveCardTheSameColumn = async (columnId,cards,cardOrderIds) => {
		const updateBoard = {...board};
		const column = updateBoard.columns.find((i) => i._id === columnId);
		if(isEqual(column.cardOrderIds,cardOrderIds)) return;
		column.cards = cards;
		column.cardOrderIds = cardOrderIds;
		setBoard(updateBoard);
		const response = await updateColumnAPI(columnId, {cardOrderIds});		
		// if(response?._id)
		// 	toast.success('move card successfully');
	}
	const updateMoveCardDifferentColumn = async (cardId, prevColumnId, nextColumnId,columns) => {
		const updateBoard ={...board};
		updateBoard.columns = columns;
		const columnOrderIds = columns.map((i) => i._id);
		setBoard({...updateBoard, columnOrderIds});
		let prevCardOrderIds = columns.find((i) => i._id === prevColumnId).cardOrderIds;
		if(prevCardOrderIds[0].includes('placeholder-card'))
			prevCardOrderIds=[];
		let nextCardOrderIds = columns.find((i) => i._id === nextColumnId).cardOrderIds;
		const response = await moveCardToDifferentColumnsAPI({
			cardId,
			prevColumnId,
			prevCardOrderIds,
			nextColumnId,
			nextCardOrderIds,
		});
		// if(response)
		// 	toast.success('move card successfully');
	}
	const deleteColumn = async (columnId) => {
		const updateBoard = {...board};
		updateBoard.columns = updateBoard.columns.filter((i) => i._id !== columnId);
		const columnOrderIds = updateBoard.columns.map((i) => i._id);
		setBoard({...updateBoard, columnOrderIds});
		const response = await deleteColumnAPI(columnId);
		if(response)
			toast.success(response?.message);
	}

	if(!board) return (
    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',height:'100vh',
		gap:2, width:'100vw',backgroundColor:'primary.main'}}>
      <CircularProgress color="secondary"/>
			<Typography variant="span"  color="secondary.main" sx={{fontSize:'1.5rem', fontWeight:'bold'}} >Loading...</Typography>
    </Box>
  );
	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
				<AppBar />
				<AppBoard board={board} />
				<ContentBoard board={board} 
					createNewColumn={createNewColumn} 
					createNewCard={createNewCard}
					updateMoveColumns={updateMoveColumns}
					updateMoveCardTheSameColumn={updateMoveCardTheSameColumn}
					updateMoveCardDifferentColumn={updateMoveCardDifferentColumn}
					deleteColumn={deleteColumn}
				/>
			</Container>
		</>
	);
};

export default Dashboard;
