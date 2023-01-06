import { ReviewItem } from "../data/models/lectureModel";

export const getRatingValue = (data: ReviewItem[]) => {
	return data.reduce((a, b) => a + b.rating, 0) / data.length;
};
