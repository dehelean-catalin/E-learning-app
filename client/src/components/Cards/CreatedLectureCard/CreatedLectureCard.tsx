import { Chip } from "primereact/chip";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import img from "../../../layout/images/multimedia.png";
import "./CreatedLectureCard.scss";
import { iconBasedOnStatus } from "./iconBasedOnStatus.helper";

const CreatedLectureCard: FC<{ data: CreatedLectureModel }> = ({ data }) => {
	const { title, status } = data.publish;
	const navigate = useNavigate();
	const [detailsVisibility, toggleDetails] = useState(false);

	const showDetails = () => {
		toggleDetails(true);
	};

	const hideDetails = () => {
		toggleDetails(false);
	};

	return (
		<div
			className="created-lecture-card"
			onMouseEnter={showDetails}
			onMouseLeave={hideDetails}
			onClick={() => navigate(`/creator/created-lectures/${data.id}`)}
		>
			<img src={img} alt="create-icon" />
			<div>
				<div>{title}</div>
				<div>Last Update: {data.lastUpdate}</div>
				{detailsVisibility ? (
					<>options</>
				) : (
					<Chip
						label={status}
						className="status-chip"
						icon={iconBasedOnStatus(status)}
					/>
				)}
			</div>
		</div>
	);
};

export default CreatedLectureCard;
