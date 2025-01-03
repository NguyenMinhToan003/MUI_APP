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

		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : undefined,
		border: isDragging ? '1px solid #06994C' : 'none',
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
				width: '100%',
				overflow: 'unset',
				borderRadius: '5px',
				paddingBottom: '0',
				cursor: 'pointer',
				opacity: card?.FE_PLACEHOLDER_CARD ? '0' : '1',
				visibility: card?.FE_PLACEHOLDER_CARD ? 'hidden' : 'visible',
				boxShadow: card?.FE_PLACEHOLDER_CARD ? 'none' : 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
				
			}}>
			{card.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
			<CardContent sx={{'&:hover':{border: '1px solid #06994C'},borderRadius: '5px'}} >
				<Typography
					sx={{
						color: 'primary.main', fontSize: '14px', fontWeight: 'bold',
					}}>
					{card.title}
				</Typography>
				{
					card.description && (
						<Typography
							sx={{ fontSize: '10px', paddingLeft:1, paddingTop:1}}>
							{card.description}
						</Typography>
					)
				}
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
