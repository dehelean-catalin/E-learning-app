import { useParams } from "react-router";
import LectureHeader from "../../components/Lecture/LectureHeader/LectureHeader";
import LectureSectionList from "../../components/Lecture/LectureSectionCard/LectureSectionList";
import useFetchQuery from "../../hooks/useFetchQuery";
import { ICategory, ILecture } from "../../resources/models/lectures";
import { Axios } from "../../resources/routes";
import styles from "./Lecture.module.scss";

const INITIAL_DATA: ILecture = {
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
	numberOfUsers: null,
	numberOfChapters: null,
	totalHours: null,
	language: "",
	items: [],
};

const Lecture = () => {
	const { id } = useParams();
	const { data } = useFetchQuery(
		"get-lecture",
		() => {
			return Axios.get(`/lecture/${id}`).then((res) => res.data);
		},
		{
			initialData: INITIAL_DATA,
			onError: () => console.log("error"),
			onSuccess: () => console.log("succ"),
		}
	);

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
