import Container from '@mui/material/Container';
import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard/ContentBoad'; // Corrected import
import { fetchDataBoard } from "../../apis";
import { useEffect, useState } from 'react';
import data from "../../apis/mock-data"
import { createColumn, createCard, updateBoard} from '../../apis';
import { toast } from 'react-toastify';
import {createPlaceholderCard} from '../../utils/Function'
import { isEmpty } from 'lodash';
const Dashboard = () => { 
	const [board, setBoard] = useState(null);

	const fetchData = async () => {
		const id = '66bc579f0d3b3ebd4ae745bb';
		const data = await fetchDataBoard(id);
		data.columns.forEach((column) => {
			if(isEmpty(column.cards)){
				column.cards = [createPlaceholderCard(column)];
				column.cardOrderIds = [createPlaceholderCard(column)._id];
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
		console.log(newColumn);
		const response = await createColumn(newColumn);
		if(response?._id)
			toast.success('Create column successfully');
		fetchData();
	}
	const createNewCard = async (data) => {
		const newCard = {
			...data,
			boardId: board._id,
		};
		const response = await createCard(newCard);
		if(response?._id)
			toast.success('Create card successfully');
		fetchData();
	}
	const updateMoveColumns = async (data) => {
		const columnOrderIds = data.map((i) => i._id);
		const response = await updateBoard(board._id, {columnOrderIds});
		if(response?._id)
			toast.success('Update board successfully');
	}
	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
				<AppBar />
				<AppBoard board={board} />
				<ContentBoard board={board} 
					createNewColumn={createNewColumn} 
					createNewCard={createNewCard}
					updateMoveColumns={updateMoveColumns}
				/>
			</Container>
		</>
	);
};

export default Dashboard;
