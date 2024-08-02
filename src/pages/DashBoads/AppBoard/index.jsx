import Box from '@mui/material/Box';
const AppBoard = () => {
	return (
		<Box
			sx={{
				height: (theme) => theme.trello.boardbarHeight,
				backgroundColor: 'primary.dark',
				display: 'flex',
				alignItems: 'center',
			}}>
			Main
		</Box>
	);
};
export default AppBoard;
