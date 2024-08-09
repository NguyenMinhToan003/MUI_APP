export const createPlaceholderCard = (column) => {
	return {
		_id: `${column._id}-placeholder-card`,
		boardId: column.boardId,
		columnId: column._id,
		title: '',
		FE_PLACEHOLDER_CARD: true,
	};
};
