import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
const Card = ({ card }) => {
	const shouldShowActions =
		card?.memberIds?.length ||
		card?.comments?.length ||
		card?.attachments?.length;

	return (
		<MuiCard
			sx={{
				maxWidth: 345,
				overflow: 'unset',
				boxShadow: 'none',
				borderRadius: '5px',
				paddingBottom: '0',
			}}>
			{card.cover && (
				<CardMedia
					sx={{ height: 140 }}
					image={card.cover}
					title='green iguana'
				/>
			)}
			<CardContent>
				<Typography gutterBottom variant='h6' component='div'>
					{card.title}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{ paddingBottom: '0px' }}>
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
