import Box from '@mui/material/Box';
import Cards from './Cards/Cards';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Column = ({ column }) => {
	return (
		<Box
			sx={{
				maxHeight: '100%',
				width: '360px',
				borderRadius: '5px',
				display: 'flex',
				gap: 1,
				flexDirection: 'column',
				backgroundColor: 'secondary.main',
				padding: 1,
				boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
				cursor: 'pointer',
			}}>
			<Header title={column.title} />
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					flexDirection: 'column',
					overflowY: 'auto',
					overflowX: 'hidden',
					margin: '0 5px',
					padding: '0 5px',
					'&::-webkit-scrollbar': {
						width: '0.4em',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'primary.main',
						borderRadius: '5px',
					},
					maxHeight: (theme) => theme.trello.columnContentHeight,
				}}>
				<Cards cards={column.cards} />
			</Box>
			<Footer />
		</Box>
	);
};
export default Column;
