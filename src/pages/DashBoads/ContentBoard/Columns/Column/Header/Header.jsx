import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const Header = ({ title }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Box
				sx={{
					height: (theme) => theme.trello.columnHeaderHeight,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '10px',
				}}>
				<Typography
					variant='span'
					sx={{ color: 'primary.main', fontWeight: 'bold' }}>
					{title}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<KeyboardArrowDownIcon sx={{ fontSize: '26px', cursor: 'poiter' }} />
					<MoreVertIcon
						sx={{
							fontSize: '24px',
							width: '24px',
							height: '24px',
						}}
						id='basic-button-column'
						aria-controls={open ? 'basic-menu-column' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					/>

					<Menu
						id='basic-menu-column'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button-column',
						}}>
						<MenuItem onClick={handleClose} sx={{ width: '200px' }}>
							<ListItemIcon>
								<ContentCopy fontSize='small' />
							</ListItemIcon>
							<ListItemText>Copy</ListItemText>
							<Typography variant='body2' color='text.secondary'>
								⌘C
							</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ContentPaste fontSize='small' />
							</ListItemIcon>
							<ListItemText>Paste</ListItemText>
							<Typography variant='body2' color='text.secondary'>
								⌘V
							</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ContentCut fontSize='small' />
							</ListItemIcon>
							<ListItemText>Cut</ListItemText>
							<Typography variant='body2' color='text.secondary'>
								⌘X
							</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</Box>
		</>
	);
};
export default Header;
