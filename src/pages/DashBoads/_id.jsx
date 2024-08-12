import Container from '@mui/material/Container';
import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard/ContentBoad'; // Corrected import
import { fetchDataBoard } from "../../apis";
import { useEffect, useState } from 'react';

const Dashboard = () => { 
	const [board, setBoard] = useState(null);

	const fetchData = async () => {
		const id = '66b97fd43b922ebe863ebdf4';
		const data = await fetchDataBoard(id);
		setBoard(data); 
		console.log(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
				<AppBar />
				<AppBoard board={board} />
				<ContentBoard board={board} />
			</Container>
		</>
	);
};

export default Dashboard;
