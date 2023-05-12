export const calculateRating = (ratings: any[]) => {
	return (
		Math.round(
			(ratings.reduce((a, b) => a + b.rating, 0) / ratings.length) * 100
		) / 100
	);
};
