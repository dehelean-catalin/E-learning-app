import { useParams } from "react-router";
import Spinner from "../../common/Spinner/Spinner";
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

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	const { publish, content, lastUpdate, goals, requirements } = data;

	return (
		<div className="lecture-details">
			<LecturePreview value={data} />
			<LectureContent value={content} />

			<div className="flex-1">
				<h2>Reviews</h2>
			</div>
		</div>
	);
};

export default LectureDetails;
