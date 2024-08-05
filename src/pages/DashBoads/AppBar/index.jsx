import ThemeMode from '../../../components/ThemeMode';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Workspace from './Menu/Workspace';
import Recent from './Menu/Recent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Demo from './Menu/Demo';
import Started from './Menu/Started';
import Template from './Menu/Template';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Profile from './Menu/Profile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const AppBar = () => {
	return (
		<Box
			sx={{
				width: '100%',
				padding: 2,
				height: (theme) => theme.trello.appbarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				overflowX: 'auto',
				overflowY: 'hidden',
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
				<AppsIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
				<Typography
					variant='span'
					sx={{
						fontSize: '1.2rem',
						fontWeight: 'bold',
						color: 'primary.main',
					}}>
					Trello
				</Typography>
				<Workspace />
				<Recent />
				<Demo />
				<Started />
				<Template />
				<Button variant='outlined'>Create</Button>
			</Box>
			<Box
				sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '40px' }}>
				<TextField
					id='outlined-basic'
					label='Search'
					variant='outlined'
					size='small'
				/>

				<ThemeMode />
				<NotificationsNoneIcon />
				<HelpOutlineIcon />
				<Profile />
			</Box>
		</Box>
	);
};
export default AppBar;
