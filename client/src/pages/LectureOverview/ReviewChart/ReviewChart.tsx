import { Chart } from "primereact/chart";
import { Rating } from "primereact/rating";
import { FC } from "react";
import { Review } from "../../../data/models/creatorModel";
import "./ReviewChart.scss";

const ReviewChart: FC<{ value: Review[]; chartClassName?: string }> = ({
	value,
	chartClassName,
}) => {
	const chartData = {
		labels: ["5", "4", "3", "2", "1"],
		datasets: [
			{
				label: "Rating numbers",
				backgroundColor: "#6f7699",
				data: [
					value.filter((v) => v.rating === 5).length,
					value.filter((v) => v.rating === 4).length,
					value.filter((v) => v.rating === 3).length,
					value.filter((v) => v.rating === 2).length,
					value.filter((v) => v.rating === 1).length,
				],
			},
		],
	};
	const chartOptions = {
		indexAxis: "y",
		maintainAspectRatio: false,
		aspectRatio: 2,

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

	return (
		<div className="review-chart">
			<div className="rating">
				<h1>
					{(value.reduce((a, b) => b.rating + a, 0) / value.length).toFixed(1)}
				</h1>
				<Rating
					value={value.reduce((a, b) => b.rating + a, 0) / value.length}
					readOnly
					cancel={false}
				/>
				<p>based on {value.length} reviews</p>
			</div>
			<Chart
				className={`chart ${chartClassName ? chartClassName : ""}`}
				type="bar"
				data={chartData}
				options={chartOptions}
			/>
		</div>
	);
};

export default ReviewChart;
