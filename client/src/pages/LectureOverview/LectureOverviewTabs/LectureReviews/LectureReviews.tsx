import { Dropdown } from "primereact/dropdown";
import { FC, useState } from "react";
import { Review } from "../../../../data/models/creatorModel";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviews.scss";

const LectureReviews: FC<{ value: Review[] }> = ({ value }) => {
	const [reviews, setReviews] = useState(value);
	const [ratingValue, setRatingValue] = useState();

	const options = [
		{ rating: "All ratings", value: 0 },
		{ rating: "5 stars", value: 5 },
		{ rating: "4 stars", value: 4 },
		{ rating: "3 stars", value: 3 },
		{ rating: "2 stars", value: 2 },
		{ rating: "1 star", value: 1 },
	];
	const onChange = (e) => {
		if (!e.target.value) {
			setReviews(value);
			setRatingValue(e.target.name);
			return;
		}
		const filteredValues = value.filter((r) => r.rating === e.target.value);

		setReviews(filteredValues);
		setRatingValue(e.target.name);
	};
	if (!value.length) return;

	return (
		<>
			<Dropdown
				className="w-10rem surface-card"
				value={ratingValue}
				onChange={onChange}
				placeholder="All ratings"
				options={options}
				optionLabel="rating"
			/>

			<div className="review-list">
				{reviews.map((review, index) => (
					<LectureReviewCard key={index} value={review} />
				))}
			</div>
		</>
	);
};

export default LectureReviews;
