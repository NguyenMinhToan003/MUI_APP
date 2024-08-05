import Card from './Card/Card';

const Cards = ({ cards }) => {
	return (
		<>
			{cards.map((card) => (
				<Card key={card} card={card} />
			))}
		</>
	);
};
export default Cards;
