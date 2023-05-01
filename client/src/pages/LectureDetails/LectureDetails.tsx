import { useParams } from "react-router";
import LectureHeaderSkeleton from "../../components/Lecture/LectureHeader/LectureHeaderSkeleton";
import LectureSectionSkeleton from "../../components/Lecture/LectureSectionCard/LectureSectionSkeleton";
import { getLecture } from "../../data/services/lecture/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./Lecture.module.scss";

const LectureDetails = () => {
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
				{/* <LectureHeader value={data} />
				<LectureDescription value={data.publish.description} />
				<LectureChapters value={data.content} />
				<LectureReviewList value={data.reviews} /> */}
				on working
			</div>
		</div>
	);
};

export default LectureDetails;
