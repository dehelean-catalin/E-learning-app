import { AxiosError, AxiosResponse } from "axios";
import { NavLink } from "react-router-dom";
import LectureCard from "../../common/LectureCard/LectureCard";
import SavedLecturesSkeleton from "../../components/SavedLecturesSkeleton/SavedLecturesSkeleton";
import { LectureModel } from "../../data/models/lectureModel";
import { useAxios } from "../../hooks/useAxios";
import useFetchQuery from "../../hooks/useFetchQuery";
import image from "../../layout/images/no-results.png";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./SavedLectures.module.scss";

const SavedLectures = () => {
	const axiosInstance = useAxios();
	const { data, isLoading, isError } = useFetchQuery(
		"save-lecture",
		() => {
			return axiosInstance.get("/user/save-lecture").then((res) => res.data);
		},
		{
			initialData: [],
			onError: (e: AxiosError) => console.log(e),
			onSuccess: (e: AxiosResponse) => console.log(e),
		}
	);
	if (isLoading) {
		return <SavedLecturesSkeleton />;
	}
	if (isError) {
		return <NotFoundError />;
	}
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
