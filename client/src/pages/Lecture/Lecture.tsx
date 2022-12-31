import { useParams } from "react-router";
import LectureHeader from "../../components/Lecture/LectureHeader/LectureHeader";
import LectureHeaderSkeleton from "../../components/Lecture/LectureHeader/LectureHeaderSkeleton";
import LectureSectionList from "../../components/Lecture/LectureSectionCard/LectureSectionList";
import LectureSectionSkeleton from "../../components/Lecture/LectureSectionCard/LectureSectionSkeleton";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import { ICategory, LectureModel } from "../../resources/models/lectureModel";
import styles from "./Lecture.module.scss";

const INITIAL_DATA: LectureModel = {
	id: "",
	title: "",
	description: "",
	thumbnail: "",
	category: ICategory.ALL,
	subCategory: "",
	createdAt: "",
	createdBy: "",
	lastUpdate: "",
	rating: null,
	numberOfRates: null,
	numberOfUsers: [],
	language: "",
	items: [],
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
				<LectureHeader value={data} />
				<LectureSectionList
					items={data.items}
					className={styles["lecture-list"]}
				/>
			</div>
		</div>
	);
};

export default Lecture;
