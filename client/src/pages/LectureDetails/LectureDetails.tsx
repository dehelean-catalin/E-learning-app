import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router";
import { getLecture } from "../../data/services/lecture/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import LectureContent from "./LectureContent/LectureContent";
import "./LectureDetails.scss";
import LecturePreview from "./LecturePreview/LecturePreview";

const LectureDetails = () => {
	const { id } = useParams();
	const axios = useAxios();
	const { data, isLoading, isError } = useFetchData("get-lecture", () =>
		getLecture(axios, id)
	);

	if (isLoading)
		return (
			<div className="lecture-details-spinner">
				<ProgressSpinner />
			</div>
		);
	if (isError) return <NotFoundError />;

	const { content } = data;

	return (
		<div className="lecture-details">
			<LecturePreview value={data} />
			<LectureContent value={content} />

			<div className="flex-1">
				<h2>Reviews</h2>
				<>No reviews yet</>
			</div>
		</div>
	);
};

export default LectureDetails;
