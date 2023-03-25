import { Chip } from "primereact/chip";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { CreatedLecturesModel } from "../../../data/models/creator/createdLectures.model";
import img from "../../../layout/images/multimedia.png";
import "./CreatedLectureCard.scss";
import { iconBasedOnStatus } from "./iconBasedOnStatus.helper";

const CreatedLectureCard: FC<{ data: CreatedLecturesModel }> = ({ data }) => {
	const { title, lastUpdate, status, id } = data;
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
			onClick={() => navigate(`/creator/created-lectures/${id}`)}
		>
			<img src={img} alt="create-icon" />
			<div>
				<div>{title}</div>
				<div>Last Update: {lastUpdate}</div>
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
