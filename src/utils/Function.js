export const createPlaceHolderCard = (column) => {
	return {
		_id: `${column._id}-plaholder`,
		boardId: column.boardId,
		columnId: column._id,
		title: '',
		FE_PLACEHOLDER_CARD: true,
	};
};
