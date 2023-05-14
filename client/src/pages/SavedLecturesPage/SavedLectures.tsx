import LectureListCard from "../../components/Cards/LectureCard/LectureListCard";
import SavedLecturesSkeleton from "../../components/SavedLecturesSkeleton/SavedLecturesSkeleton";
import { getSavedLectures } from "../../data/services/saved-lectures/savedLectures.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./SavedLectures.module.scss";

const SavedLectures = () => {
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("save-lecture", () =>
		getSavedLectures(axios)
	);

	if (isLoading) return <SavedLecturesSkeleton />;

	if (isError) return <NotFoundError />;

	// if (!data.length)
	// 	return (
	// 		<Empty>
	// 			<strong>No lecture found</strong>
	// 			<p>
	// 				Looks like you didn't saved any lecture yet
	// 				<br />
	// 				Press bellow button and try to save a lecture
	// 			</p>
	// 			<NavLink to="/home?category=all">Save a lecture</NavLink>
	// 		</Empty>
	// 	);

	return (
		<div className={styles["saved-lectures"]}>
			<div className={styles.title}>Saved Lectures</div>
			<div className={styles.container}>
				{data.map((l) => (
					<LectureListCard key={l.id} value={l} icon={<></>} />
				))}
			</div>
		</div>
	);
};

export default SavedLectures;
