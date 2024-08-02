import Box from '@mui/material/Box';
const ContentBoard = () => {
	return (
		<Box
			sx={{
				height: (theme) =>
					`calc(100vh - ${theme.trello.appbarHeight} - ${theme.trello.boardbarHeight})`,
				backgroundColor: 'primary.light',
				display: 'flex',
				alignItems: 'center',
			}}>
			Footer
		</Box>
	);
};

export default ContentBoard;
