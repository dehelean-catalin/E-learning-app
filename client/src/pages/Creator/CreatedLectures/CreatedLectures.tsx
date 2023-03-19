import Spinner from "common/Spinner/Spinner";
import CreatedLectureCard from "components/Cards/CreatedLectureCard/CreatedLectureCard";
import { getCreatedLectures } from "data/services/creator";
import { useAxios } from "hooks/useAxios";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import "./CreatedLectures.scss";

const CreatedLectures = () => {
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("created-lectures", () =>
		getCreatedLectures(axios)
	);

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<div className="created-lectures">
			{data.map((lecture) => (
				<CreatedLectureCard key={lecture.id} data={lecture} />
			))}
		</div>
	);
};

export default CreatedLectures;
