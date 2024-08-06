import Box from '@mui/material/Box';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import Button from '@mui/material/Button';
const Footer = (props) => {
	return (
		<Box
			sx={{
				height: (theme) => theme.trello.columnFooterHeight,
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '10px',
			}}>
			<Button
				sx={{
					color: 'primary.main',
					fontSize: '16px',
				}}
				startIcon={<AddCardIcon />}>
				Add Card
			</Button>
			<DragHandleIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
		</Box>
	);
};

export default Footer;
