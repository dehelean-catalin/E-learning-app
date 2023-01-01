import { useParams } from "react-router";
import LectureChapters from "../../components/Lecture/LectureChapters/LectureChapters";
import LectureDescription from "../../components/Lecture/LectureDescription/LectureDescription";
import LectureHeader from "../../components/Lecture/LectureHeader/LectureHeader";
import LectureHeaderSkeleton from "../../components/Lecture/LectureHeader/LectureHeaderSkeleton";
import LectureSectionSkeleton from "../../components/Lecture/LectureSectionCard/LectureSectionSkeleton";
import LectureReviewList from "../../components/Lecture/LectureReviewList/LectureReviewList";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import { ICategory, LectureModel } from "../../resources/models/lectureModel";
import styles from "./Lecture.module.scss";

const INITIAL_DATA: LectureModel = {
	id: "",
	title: "",
	details: "",
	description: {
		data: "",
	},
	thumbnail: "",
	category: ICategory.ALL,
	subCategory: "",
	createdAt: null,
	createdBy: "",
	numberOfUsers: [],
	language: "",
	items: {
		data: [],
		description: "",
	},
	reviewList: {
		data: [],
		description: "",
	},
};

const Lecture = () => {
	const { id } = useParams();
	const axiosInstance = useAxios();
	const { data, isLoading, isError } = useFetchQuery(
		"get-lecture",
		() => {
			return axiosInstance.get(`/lecture/${id}`).then((res) => res.data);
		},
		{
			initialData: INITIAL_DATA,
			onError: () => console.log("error"),
			onSuccess: () => {},
		}
	);
	const lectureData = data as LectureModel;

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
	if (isError) {
		return <>Error</>;
	}

	return (
		<div className={styles.lecture}>
			<div className={styles.container}>
				<LectureHeader value={lectureData} />
				<LectureDescription value={lectureData.description} />
				<LectureChapters value={lectureData.items} />
				<LectureReviewList value={lectureData.reviewList} />
			</div>
		</div>
	);
};

export default Lecture;
