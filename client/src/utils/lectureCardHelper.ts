import { ReviewItem } from "../data/models/lectureModel";

export const getRatingValue = (data: ReviewItem[]) => {
	return (
		Math.round((data.reduce((a, b) => a + b.rating, 0) / data.length) * 100) /
		100
	);
};
