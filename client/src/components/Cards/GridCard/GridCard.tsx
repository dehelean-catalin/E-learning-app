import { CustomRating } from "components/CustomRating/CustomRating";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { useNavigate } from "react-router";
import {
	BasicLecture,
	HistoryLecture,
} from "../../../data/models/lectureModel";
import "./GridCard.scss";

type Props = {
	value: BasicLecture | HistoryLecture;
	icon?: JSX.Element;
};

const GridCard: FC<Props> = ({ value, icon }) => {
	const navigate = useNavigate();

	const { id, title, caption, author, rating, numberOfRatings } = value;

	const handleImgClick = () => {
		if ("progress" in value) {
			navigate(`/lecture/${id}/overview/${value.lastChapter}`);
			return;
		}

		navigate(`/lecture/${id}`);
	};

	return (
		<article className="grid-card">
			<img
				className={classNames({ "gray-out": "progress" in value })}
				src={caption}
				alt="caption"
				loading="lazy"
				onClick={handleImgClick}
			/>

			<div className="flex">
				<div className="flex-1">
					<h3 className="mb-1">{title}</h3>
					<p className="text-color-secondary">{author}</p>
					{!!numberOfRatings && (
						<CustomRating rating={rating} numberOfRates={numberOfRatings} />
					)}
				</div>

				{icon}
				{"progress" in value && (
					<div
						className="progress-wrapper"
						onClick={() =>
							navigate(`/lecture/${id}/overview/${value?.lastChapter}`)
						}
					>
						<h3 className="ml-3 mb-2">{value.lastName}</h3>
						<ProgressBar
							value={value.progress}
							className="progress"
						></ProgressBar>
					</div>
				)}
			</div>
		</article>
	);
};

export default GridCard;
