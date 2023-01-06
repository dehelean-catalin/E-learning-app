import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiAddCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../config/axiosInstance";
import LectureCard from "../../common/LectureCard/LectureCard";
import styles from "./SavedLectures.module.scss";

const SavedLectures = () => {
	const navigate = useNavigate();
	const axiosInstance = useAxios();
	const { data } = useFetchQuery(
		"save-lecture",
		() => {
			return axiosInstance.get("/user/save-lecture").then((res) => res.data);
		},
		{
			initialData: [],
			onError: (e) => console.log(e),
			onSuccess: (e) => console.log(e),
		}
	);

	const getLectures = () => {
		if (!data.length)
			return (
				<div
					className={styles.empty}
					onClick={() => navigate("/home?category=all")}
				>
					<RiAddCircleLine fontSize="40px" />
					<div>Add new lectures</div>
				</div>
			);

		return data?.map((lecture, key) => (
			<LectureCard
				key={key}
				value={lecture}
				className={styles.card}
				bannerClassName={styles.banner}
				contentClassName={styles.content}
				icon={<BiDotsVerticalRounded size="26px" />}
			/>
		));
	};
	return (
		<div className={styles["saved-lectures"]}>
			<div className={styles.title}>Saved Lectures</div>
			<div className={styles.container}>{getLectures()}</div>
		</div>
	);
};

export default SavedLectures;
