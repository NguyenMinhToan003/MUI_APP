import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ card }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: card._id, data: card });
	const style = {
		touchAction: 'none',
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : undefined,
		border: isDragging ? '2px solid #06994C' : 'none',
	};
	const shouldShowActions =
		card?.memberIds?.length ||
		card?.comments?.length ||
		card?.attachments?.length;
	return (
		<MuiCard
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			sx={{
				width: 340,
				overflow: 'unset',
				boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 12px 0px',
				borderRadius: '5px',
				paddingBottom: '0',
			}}>
			{card.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
			<CardContent>
				<Typography
					sx={{
						color: 'primary.main',
						fontSize: '14px',
						fontWeight: 'bold',
					}}>
					{card.title}
				</Typography>
				<Typography
					sx={{ fontSize: '12px', color: 'primary.main', fontStyle: 'italic' }}>
					{card.description}
				</Typography>
			</CardContent>
			{!!shouldShowActions && (
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
					}}>
					<Button startIcon={<PersonIcon />}>{card?.memberIds?.length}</Button>
					<Button startIcon={<MessageIcon />}>{card?.comments?.length}</Button>
					<Button startIcon={<AttachFileIcon />}>
						{card?.attachments?.length}
					</Button>
				</CardActions>
			)}
		</MuiCard>
	);
};
export default Card;
