import Box from '@mui/material/Box';
import Column from './Column/Column';
import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
const Columns = ({ columns }) => {
	//*item is the column id ex:[ 'column-1', 'column-2', 'column-3'] not the column object
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
						<Column key={column._id} column={column} />
					))}
					<Box>
						<Button
							startIcon={<FileCopyIcon />}
							sx={{
								backgroundColor: 'secondary.main',
								color: 'primary.main',
								paddingX: '30px',
								paddingY: '10px',
								':hover': {
									backgroundColor: 'primary.main',
									color: 'secondary.main',
								},
								whiteSpace: 'nowrap',
							}}
							onClick={() => {
								console.log('Add Columns');
							}}>
							Add Columns
						</Button>
					</Box>
				</Box>
			</SortableContext>
		</>
	);
};
export default Columns;
