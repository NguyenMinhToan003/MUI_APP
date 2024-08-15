import Container from '@mui/material/Container';
import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard/ContentBoad'; // Corrected import
import { fetchDataBoardAPI } from "../../apis";
import { useEffect, useState } from 'react';
import data from "../../apis/mock-data"
import { createColumnAPI, createCardAPI, updateBoardAPI, updateColumnAPI} from '../../apis';
import { toast } from 'react-toastify';
import {createPlaceholderCard} from '../../utils/Function'
import { isEmpty } from 'lodash';
import mapOrder from "../../utils/Mapping" 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
const Dashboard = () => { 
	const [board, setBoard] = useState(null);

	const fetchData = async () => {
		const id = '66bc579f0d3b3ebd4ae745bb';
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
		console.log(data)
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
		if(response?._id)
			toast.success('move column successfully');
	}
	const updateMoveCardTheSameColumn = async (columnId,cards,cardOrderIds) => {
		console.log(columnId,cards,cardOrderIds)
		const updateBoard = {...board};
		const column = updateBoard.columns.find((i) => i._id === columnId);
		column.cards = cards;
		column.cardOrderIds = cardOrderIds;
		setBoard(updateBoard);
		const response = await updateColumnAPI(columnId, {cardOrderIds});		
		if(response?._id)
			toast.success('move card successfully');
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
				/>
			</Container>
		</>
	);
};

export default Dashboard;
