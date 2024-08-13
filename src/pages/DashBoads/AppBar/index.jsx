import ThemeMode from '../../../components/ThemeMode';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Workspace from './Menu/Workspace';
import Recent from './Menu/Recent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Started from './Menu/Started';
import Template from './Menu/Template';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Profile from './Menu/Profile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
const AppBar = () => {
	return (
		<Box
			sx={{
				width: '100%',
				padding: 2,
				minHeight: (theme) => theme.trello.appbarHeight,
				maxHeight: (theme) => theme.trello.appbarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				overflowX: 'auto',
				overflowY: 'hidden',
				backgroundColor: 'secondary.main',
				paddingX: '20px',
				paddingY: '10px',
				
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
				<AppsIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
				<Typography
					variant='span'
					sx={{
						fontSize: '1.2rem',
						fontWeight: 'bold',
						color: 'primary.main',
						paddingRight: '20px'
					}}>
					Trello
				</Typography>
				<Workspace />
				<Recent />
		
				<Started />
				<Template />
				<Button variant='text' endIcon={<LibraryAddIcon/>}>Create</Button>
			</Box>
			<Box
				sx={{ height:'40px',display: 'flex', alignItems: 'center',justifyContent:'center', gap: 2 }}>
				<TextField
					id='outlined-basic-search'
					label="Search"
					size='small'
				/>
				<ThemeMode />
				<NotificationsNoneIcon />
				<HelpOutlineIcon sx={{ color: 'error.main' }} />
				<Profile />
			</Box>
		</Box>
	);
};
export default AppBar;
