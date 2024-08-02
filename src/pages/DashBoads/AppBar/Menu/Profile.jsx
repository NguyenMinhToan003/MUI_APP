import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
const Profile = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Button
				id='basic-button-profile'
				aria-controls={open ? 'basic-menu-profile' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{ padding: 0, width: 'full-content' }}>
				<Avatar
					alt='Avatar'
					src='../../../assets/kjptpp5h.jpg'
					sx={{ width: 32, height: 32 }}
				/>
			</Button>
			<Menu
				id='basic-menu-profile'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button-profile',
				}}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</Box>
	);
};
export default Profile;
