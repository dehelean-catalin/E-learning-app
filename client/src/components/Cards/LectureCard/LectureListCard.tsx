import { FC } from "react";
import { useNavigate } from "react-router";
import { SavedLecture } from "../../../data/models/lectureModel";
import { CustomRating } from "../../CustomRating/CustomRating";
import "./LectureListCard.scss";

type Props = {
	value: SavedLecture;
	captionClassName?: string;
	icon: JSX.Element;
};

const LectureListCard: FC<Props> = ({ value, captionClassName, icon }) => {
	const navigate = useNavigate();

	return (
		<div className="lecture-list-card">
			<img
				className={`${captionClassName ? captionClassName : ""}`}
				src={value.caption}
				alt="caption"
				onClick={() => navigate(`/lecture/${value.id}`)}
			/>

			<div className="content">
				<h3>{value.title}</h3>
				<p className="text-color-secondary">{value.author}</p>

				<CustomRating
					rating={value.rating}
					numberOfRates={value.numberOfRatings}
					enrolledUsers={value.enrolledUsers.length}
				/>
				<h4 className="desc">{value?.description}</h4>
			</div>
			{icon}
		</div>
	);
};

export default LectureListCard;
