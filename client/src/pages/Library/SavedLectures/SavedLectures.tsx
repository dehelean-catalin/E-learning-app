import { NavLink } from "react-router-dom";
import LectureListCard from "../../../components/Cards/LectureCard/LectureListCard";
import Empty from "../../../components/Empty/Empty";
import Spinner from "../../../components/Spinner/Spinner";
import { useAxios } from "../../../data/hooks/useAxios";
import { useFetchData } from "../../../data/hooks/useFetchData";
import { getSavedLectures } from "../../../data/services/lectureService";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";
import SavedLectureActionBar from "./SavedLectureActionBar";
import "./SavedLectures.scss";

const SavedLectures = () => {
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("save-lecture", () =>
		getSavedLectures(axios)
	);

	if (isError) return <NotFoundError />;

	return (
		<div className="saved-lectures">
			<h2>Saved Lectures</h2>
			{isLoading ? (
				<Spinner />
			) : data.length ? (
				<div className="container">
					{data.map((l) => (
						<LectureListCard
							key={l.id}
							value={l}
							captionClassName="saved-caption"
							icon={<SavedLectureActionBar id={l.id} />}
						/>
					))}
				</div>
			) : (
				<Empty>
					<strong>No lecture found</strong>
					<p>
						Looks like you didn't saved any lecture yet
						<br />
						Press bellow button and try to save a lecture
					</p>
					<NavLink to="/home?category=All">Save a lecture</NavLink>
				</Empty>
			)}
		</div>
	);
};

export default SavedLectures;
