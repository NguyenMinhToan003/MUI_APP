import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
const AppBoard = ({ board }) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: (theme) => theme.trello.boardbarHeight,
				backgroundColor: 'primary.main',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				overflowX: 'auto',
				overflowY: 'hidden',
				padding: 2,
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyItems: 'start',
					alignItems: 'center',
					gap: 2,
				}}>
				<Typography variant='h6' sx={{ color: 'white', marginLeft: 2 }}>
					{board.title}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2,
				}}>
				<Button
					variant='contained'
					startIcon={<StarBorderIcon />}
					sx={{ backgroundColor: 'orange' }}>
					Star
				</Button>
				<Button
					variant='contained'
					startIcon={<PublicIcon />}
					sx={{ backgroundColor: 'green' }}>
					Public
				</Button>
				<Button
					variant='contained'
					startIcon={<CalendarMonthIcon />}
					sx={{ backgroundColor: 'plum' }}>
					Calendar
				</Button>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					sx={{ backgroundColor: 'orangered' }}>
					addBoard
				</Button>{' '}
			</Box>
		</Box>
	);
};
export default AppBoard;
