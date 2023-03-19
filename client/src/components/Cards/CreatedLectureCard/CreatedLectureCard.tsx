import img from "../../../layout/images/multimedia.png";
import "./CreatedLectureCard.scss";

const CreatedLectureCard = ({ data }) => {
	return (
		<div className="created-lecture-card">
			<img src={img} alt="create-icon" />
			{data.title}
		</div>
	);
};

export default CreatedLectureCard;
