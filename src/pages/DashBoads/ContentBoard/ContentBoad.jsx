import Box from '@mui/material/Box';
import Columns from './Columns/Columns';

const ContentBoard = ({ board }) => {
	return (
		<Box
			sx={{
				height: (theme) => theme.trello.boardContentHeight,
				backgroundColor: 'primary.light',
				display: 'flex',
				gap: 3,
				padding: 2,

				width: '100%',
				overflowX: 'auto',
				overflowY: 'hidden',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'start',
					gap: 3,
				}}>
				<Columns columns={board.columns} />
			</Box>
		</Box>
	);
};

export default ContentBoard;
