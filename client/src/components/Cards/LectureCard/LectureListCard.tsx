import { FC } from "react";
import { useNavigate } from "react-router";
import { LectureCard } from "../../../data/models/lectureModel";
import { CustomRating } from "../../CustomRating/CustomRating";
import "./LectureListCard.scss";

type Props = {
	value: LectureCard;
	className?: string;
	captionClassName?: string;
	icon: JSX.Element;
};

const LectureListCard: FC<Props> = ({
	value,
	className,
	captionClassName,
	icon,
}) => {
	const navigate = useNavigate();

	const {
		id,
		title,
		author,
		caption,
		rating,
		enrolledUsers,
		numberOfRatings,
		description,
	} = value;

	return (
		<div className="lecture-list-card">
			<img
				className={`${captionClassName ? captionClassName : "lg:h-10rem"}`}
				src={caption}
				alt="caption"
				onClick={() => navigate(`/lecture/${id}`)}
			/>

			<div className="content">
				<h2>
					<span>{title}</span>
				</h2>
				<p>{author}</p>

				<CustomRating
					rating={rating}
					numberOfRates={numberOfRatings}
					enrolledUsers={enrolledUsers.length}
				/>
				<p className="desc">{description}</p>
			</div>
			{icon}
		</div>
	);
};

export default LectureListCard;
