import Column from './Column/Column';

const Columns = ({ columns }) => {
	return (
		<>
			{columns.map((column) => (
				<Column key={column._id} column={column} />
			))}
		</>
	);
};
export default Columns;
