import Card from './Card/Card';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
const Cards = ({ cards }) => {
	return (
		<>
			<SortableContext
				items={cards.map((i) => i._id)}
				strategy={verticalListSortingStrategy}>
				{cards.map((card) => (
					<Card key={card._id} card={card} />
				))}
			</SortableContext>
		</>
	);
};
export default Cards;
