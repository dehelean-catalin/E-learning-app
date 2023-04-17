import { CreatedLectureModel } from "data/models/createdLecture.model";
import img from "layout/images/test.png";
import { FC } from "react";
import { useNavigate } from "react-router";
import { getRelativeTime } from "../../../helpers";
import "./CreatedLectureCard.scss";

const CreatedLectureCard: FC<{ data: CreatedLectureModel }> = ({ data }) => {
	const { title, status, caption, description } = data.publish;
	const navigate = useNavigate();
	return (
		<article
			className="created-lecture-card"
			onClick={() => navigate(`/creator/created-lectures/${data.id}`)}
		>
			{caption ? (
				<img src={caption} alt="caption" />
			) : (
				<img className="empty-caption" src={img} alt="create-icon" />
			)}
			<div className="container">
				<h2>{title}</h2>
				<p>{description}</p>
				<ul className="flex align-items-center">
					{!!data?.enrolledUsers?.length && (
						<li>{data.enrolledUsers.length} enrollments</li>
					)}
					{!!data?.reviews?.length && <li>{data.reviews.length} reviews</li>}
					<li>{getRelativeTime(data.lastUpdate)}</li>
				</ul>
			</div>
			<div className="edit">
				Edit<p className="chip">{status}</p>
			</div>
		</article>
	);
};

export default CreatedLectureCard;
