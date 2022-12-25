import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ICategory, ILecture } from "../../resources/models/lectures";
import { Axios } from "../../resources/routes";
import styles from "./Lecture.module.scss";
import LectureHeader from "../../components/Lecture/LectureHeader/LectureHeader";
import LectureSectionList from "../../components/Lecture/LectureSectionCard/LectureSectionList";
import AuthContext from "../../store/context/auth-context";

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
	const [lecture, setLecture] = useState<ILecture>(INITIAL_DATA);
	const { token } = useContext(AuthContext);
	useEffect(() => {
		Axios.get(`/lectures/${id}`, {
			headers: { authorization: "Bearer " + token },
		})
			.then((res) => setLecture(res.data))
			.catch((err) => console.log(err.response.data));
	}, [id, token]);

	return (
		<div className={styles.lecture}>
			<div className={styles.container}>
				<LectureHeader value={lecture} />
				<LectureSectionList
					items={lecture.items}
					className={styles["lecture-list"]}
				/>
			</div>
		</div>
	);
};

export default Lecture;
