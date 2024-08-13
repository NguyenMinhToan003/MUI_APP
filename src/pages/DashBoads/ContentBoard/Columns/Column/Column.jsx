import Box from '@mui/material/Box';
import Cards from './Cards/Cards';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import mapOrder from '../../../../../utils/Mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Column = ({ column }) => {
	let cardOrder = mapOrder(column?.cards, column?.cardOrderIds, 'id');
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: column._id, data: column });

	const style = {
		touchAction: 'none',
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : undefined,
	};
	return (
		<Box ref={setNodeRef} style={style} {...attributes} sx={{ height: '100%' }}>
			<Box
				{...listeners}
				sx={{
					maxHeight: '100%',
					minWidth: '360px',
					maxWidth: '360px',
					borderRadius: '8px',
					display: 'flex',
					gap: 1,
					flexDirection: 'column',
					backgroundColor: 'secondary.main',
					boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 12px 0px',
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
					<Cards cards={cardOrder} />
				</Box>
				<Footer />
			</Box>
		</Box>
	);
};
export default Column;
