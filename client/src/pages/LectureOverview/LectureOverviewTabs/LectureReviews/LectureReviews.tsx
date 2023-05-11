import { Chart } from "primereact/chart";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { FC, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import PRButton from "../../../../components/Forms/Buttons/PRButton/PRButton";
import { Review } from "../../../../data/models/createdLecture.model";
import { RootState } from "../../../../data/redux/reducers";
import { useAxios } from "../../../../hooks/useAxios";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviews.scss";

type LectureReviewsProps = {
	reviews: Review[];
	yourReview: Review[];
};

const LectureReviews: FC<{ value: LectureReviewsProps }> = ({ value }) => {
	const axios = useAxios();
	const { id } = useParams();
	const [rating, setRating] = useState(null);
	const [message, setMessage] = useState("");
	const [date, setDate] = useState("");
	const author = useSelector<RootState, string>(
		(s) => s.accountReducer.data.displayName
	);

	const handleCancel = () => {
		setMessage("");
		setRating(0);
		setDate("");
	};
	const chartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "red",
				data: [65, 59, 80, 81, 56, 55, 40],
			},
			{
				label: "My Second dataset",
				backgroundColor: "red",
				data: [28, 48, 40, 19, 86, 27, 90],
			},
		],
	};
	const chartOptions = {
		indexAxis: "y",
		maintainAspectRatio: false,
		aspectRatio: 0.8,

		scales: {
			x: {
				ticks: {
					font: {
						weight: 500,
					},
				},
				grid: {
					display: false,
					drawBorder: false,
				},
			},
			y: {
				grid: {
					drawBorder: false,
				},
			},
		},
	};

	const { mutate: handleSubmit, isLoading } = useMutation(
		"postLectureReview",
		(e: FormEvent) => {
			e.preventDefault();
			if (!message) return;
			if (!rating) return;

			setDate(new Date().toLocaleString());
			return axios.post(`lecture/${id}/review`, { author, message, rating });
		}
	);

	return (
		<div className="lecture-reviews">
			{!value.yourReview.length ? (
				<form onSubmit={handleSubmit}>
					<Rating
						value={rating}
						onChange={(e) => setRating(e.value)}
						cancel={false}
					/>
					<InputText
						placeholder="add"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<PRButton label="Cancel" icon="pi pi-times" onClick={handleCancel} />
					<PRButton
						type="submit"
						label="Confirm"
						icon="pi pi-check"
						loading={isLoading}
					/>
				</form>
			) : (
				<LectureReviewCard
					author={value.yourReview[0].author}
					message={value.yourReview[0].message}
					rating={value.yourReview[0].rating}
					date={value.yourReview[0].date}
				/>
			)}
			<Chart type="bar" data={chartData} options={chartOptions} />
			<div className="review-list">
				{value.reviews.map(({ author, message, date, rating }, index) => (
					<LectureReviewCard
						className="flex-card"
						key={index}
						author={author}
						message={message}
						rating={rating}
						date={date}
					/>
				))}
			</div>
		</div>
	);
};

export default LectureReviews;
