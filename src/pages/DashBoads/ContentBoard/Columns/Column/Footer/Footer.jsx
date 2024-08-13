import Box from '@mui/material/Box';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { orange } from '@mui/material/colors';
const Footer = (props) => {
	const [statusFormCard, setStatusFormCard] = useState(false);
	return (
		<Box
			sx={{
				height: (theme) => theme.trello.columnFooterHeight,
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '10px',
				gap:2
			}}>
			{
				!statusFormCard?
				<Button
				sx={{
					color: 'primary.main',
					fontSize: '16px',
				}}
				onClick={() => setStatusFormCard(!statusFormCard)}
				startIcon={<AddCardIcon />}>
				Add Card
			</Button>
			
			:
			<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:1, height:'100%',width:'100%'}}>
				<TextField size="small" label="Add card" sx={{width:'100%'}} />
				<Button variant='contained' sx={{height:'100%'}} >Add</Button>
			</Box>
			}
			{
				!statusFormCard?
				<DragHandleIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
				:
				<CloseIcon onClick={()=>setStatusFormCard(!statusFormCard)} 
				sx={{cursor:'pointer',color:orange[500]}}/>
			}
		</Box>
	);
};

export default Footer;
