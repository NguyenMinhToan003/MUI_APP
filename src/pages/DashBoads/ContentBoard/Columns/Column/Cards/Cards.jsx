import Card from './Card/Card';

const Cards = ({ cards }) => {
	return (
		<>
			{cards.map((card) => (
				<Card key={card._id} card={card} />
			))}
		</>
	);
};
export default Cards;
