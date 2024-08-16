import Box from '@mui/material/Box';
import Column from './Column/Column';
import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import  Button from '@mui/material/Button';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { green, orange } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
const Columns = ({ columns, createNewColumn, createNewCard}) => {
	//*item is the column id ex:[ 'column-1', 'column-2', 'column-3'] not the column object
	const [addColumnTitle, setAddColumnTitle] = useState('');	
	const [statusFormColumn,setStatusFormColumn] = useState(false);
	const handlerAddColumn = async() => {
		if(addColumnTitle.trim() === ''){
			toast.error('Please enter column title');
		}
		else{
			await createNewColumn({title:addColumnTitle});
			setAddColumnTitle('');
			setStatusFormColumn(!statusFormColumn);
		}
	}

	return (
		<>
			<SortableContext
				items={columns.map((i) => i._id)}
				strategy={horizontalListSortingStrategy}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'start',
						gap: 3,
						width: '100%',
						overflowX: 'auto',
						overflowY: 'hidden',
						paddingBottom: 2,
						paddingLeft: '5px',
					}}>
					{columns.map((column) => (
						<Column key={column._id} column={column} createNewCard={createNewCard} />
					))}
					<Box sx={{
								minWidth: '360px',maxWidth: '360px',borderRadius: '8px',					
								whiteSpace: 'nowrap',backgroundColor: 'secondary.main',color: 'primary.main',
							}}>
						{
							!statusFormColumn?	
								<Button onClick={()=>setStatusFormColumn(!statusFormColumn)}
								sx={{
									':hover': {
										backgroundColor: 'primary.main',
										color: 'secondary.main',
									}
									,height: '100%', width: '100%',}}
								startIcon={<FileCopyIcon />}
								>
								Add Columns
							</Button>
							:
							<Box sx={{height: '100%', width: '100%', display:'flex',alignItems:'center',justifyContent:'space-around',paddingRight:1, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
								<TextField autoFocus size='small' sx={{height: '100%',padding:1}} onChange={(event)=>setAddColumnTitle(event.target.value)}/>
								<Button variant='contained'
								 sx={{backgroundColor:green[500],height: '100%',padding:1,":hover":{backgroundColor:orange[500]}}} onClick={()=>handlerAddColumn()} >Add</Button>								<CloseIcon onClick={()=>setStatusFormColumn(!statusFormColumn)} 
								sx={{cursor:'pointer',color:orange[500]}}/>
							
							</Box>
						}
						
					</Box>
				</Box>
			</SortableContext>
		</>
	);
};
export default Columns;
