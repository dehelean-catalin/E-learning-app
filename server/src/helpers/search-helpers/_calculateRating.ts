import { ReviewItem } from "../../models/lecture-model";

export const calculateRating = (ratings: ReviewItem[]) => {
	return (
		Math.round(
			(ratings.reduce((a, b) => a + b.rating, 0) / ratings.length) * 100
		) / 100
	);
};
