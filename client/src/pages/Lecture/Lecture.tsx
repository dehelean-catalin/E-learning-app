import { useParams } from "react-router";
import LectureChapters from "../../components/Lecture/LectureChapters/LectureChapters";
import LectureDescription from "../../components/Lecture/LectureDescription/LectureDescription";
import LectureHeader from "../../components/Lecture/LectureHeader/LectureHeader";
import LectureHeaderSkeleton from "../../components/Lecture/LectureHeader/LectureHeaderSkeleton";
import LectureReviewList from "../../components/Lecture/LectureReviewList/LectureReviewList";
import LectureSectionSkeleton from "../../components/Lecture/LectureSectionCard/LectureSectionSkeleton";
import { getLecture } from "../../data/services/lecture/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./Lecture.module.scss";

const Lecture = () => {
	const { id } = useParams();
	const axios = useAxios();
	const { data, isLoading, isError } = useFetchData("get-lecture", () =>
		getLecture(axios, id)
	);

	if (isLoading) {
		return (
			<div className={styles.lecture}>
				<div className={styles.container}>
					<LectureHeaderSkeleton />
					<LectureSectionSkeleton />
				</div>
			</div>
		);
	}

	if (isError) return <NotFoundError />;

	return (
		<div className={styles.lecture}>
			<div className={styles.container}>
				<LectureHeader value={data} />
				<LectureDescription value={data.description} />
				<LectureChapters value={data.items} />
				<LectureReviewList value={data.reviews} />
			</div>
		</div>
	);
};

export default Lecture;
