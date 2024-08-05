import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
const Footer = (props) => {
	return (
		<Box
			sx={{
				height: (theme) => theme.trello.columnFooterHeight,
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '0 6px',
			}}>
			<Button
				variant='contained'
				color='primary'
				startIcon={<AddIcon />}
				sx={{ width: '100%', height: '100%', fontSize: '16px' }}>
				Add Card
			</Button>
		</Box>
	);
};

export default Footer;
