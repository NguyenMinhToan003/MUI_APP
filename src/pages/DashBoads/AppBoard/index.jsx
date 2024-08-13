import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PublicIcon from '@mui/icons-material/Public';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
const AppBoard = ({ board }) => {
	const listAvartar=board?.members || [{name:"A",image:'https://avatars.githubusercontent.com/u/117341351?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	{name:"B",image:'https://avatars.githubusercontent.com/u/112341351?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	{name:"C",image:'https://avatars.githubusercontent.com/u/117311351?s=400&u=895161a6128008eb8d79b11760c7d7fa5cf0a20f&v=4'},
	{name:"D",image:'https://avatars.githubusercontent.com/u/117941351?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	{name:"E",image:'https://avatars.githubusercontent.com/u/107341351?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	{name:"F",image:'https://avatars.githubusercontent.com/u/117341361?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	{name:"G",image:'https://avatars.githubusercontent.com/u/117341851?s=400&u=895161a6128008eb8d79b16760c7d7fa5cf0a20f&v=4'},
	];	
	return (
		<>
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
				padding: '10px',
				color:'secondary.main'
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyItems: 'start',
					alignItems: 'center',
					gap: 5,
				}}>
				<Typography
					variant='h6'
					sx={{  marginLeft: 2, whiteSpace: 'nowrap' }}>
					{board?.title}
				</Typography>
				<Button variant='text' sx={{ color: 'secondary.main' }} startIcon={board?.type?<PublicIcon/>:<VpnLockIcon/>}>{board?.type?'Public':'Private'}</Button>
				<Button variant='text' sx={{ color: 'secondary.main' }} startIcon={<AddToDriveIcon />}>Add to Drive</Button>
				<Button variant='text' sx={{ color: 'secondary.main' }} startIcon={<BoltIcon />}>Automatic</Button>
				<Button variant='text' sx={{ color: 'secondary.main' }} startIcon={<FilterListIcon />}>Filter</Button>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2,
				}}>
			<Button variant='outlined' sx={{ color: 'secondary.main' }} startIcon={<PersonAddAlt1Icon />}>Invite</Button >
				<AvatarGroup max={7} size="small">	
					{listAvartar.map((item,index) => (
						<Avatar key={index} alt={item.name} src={item.image} sx={{height:'30px' , width:'30px', cursor:'pointer'}}/>
					))}
				</AvatarGroup>
			</Box>
		</Box>
	
		</>
	);
};
export default AppBoard;
