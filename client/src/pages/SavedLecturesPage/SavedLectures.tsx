import { NavLink } from "react-router-dom";
import LectureCard from "../../components/Cards/LectureCard/LectureCard";
import SavedLecturesSkeleton from "../../components/SavedLecturesSkeleton/SavedLecturesSkeleton";
import { LectureModel } from "../../data/models/lectureModel";
import { getSavedLectures } from "../../data/services/saved-lectures/savedLectures.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import image from "../../layout/images/no-results.png";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./SavedLectures.module.scss";

const SavedLectures = () => {
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("save-lecture", () =>
		getSavedLectures(axios)
	);

	if (isLoading) return <SavedLecturesSkeleton />;

	if (isError) return <NotFoundError />;

	if (!data.length) {
		return (
			<NotFound>
				<img src={image} alt="not found" />
				<strong>No lecture found</strong>
				<div>
					Looks like you didn't saved any lecture yet
					<br />
					Press bellow button and try to save a lecture
				</div>
				<NavLink to="/home?category=all">Save a lecture</NavLink>
			</NotFound>
		);
	}

	return (
		<div className={styles["saved-lectures"]}>
			<div className={styles.title}>Saved Lectures</div>
			<div className={styles.container}>
				{data?.map((lecture: LectureModel, key: string) => (
					<LectureCard
						key={key}
						value={lecture}
						className={styles.card}
						bannerClassName={styles.banner}
						contentClassName={styles.content}
					/>
				))}
			</div>
		</div>
	);
};

export default SavedLectures;
