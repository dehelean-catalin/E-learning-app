import { BiDotsVerticalRounded } from "react-icons/bi";
import LectureCard from "../../components/common/LectureCard/LectureCard";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import styles from "./History.module.scss";
import HistoryCard from "./HistoryCard";
const History = () => {
	const axiosInstance = useAxios();
	const { data } = useFetchQuery(
		"history",
		async () => {
			const res = await axiosInstance.get("/user/history");
			return res.data;
		},
		{
			initialData: [],
			onSuccess: () => console.log("lala"),
			onError: () => {},
		}
	);

	return (
		<div className={styles.history}>
			<div className={styles.title}>Recent watched</div>
			<div className={styles.content}>
				{!!data.length &&
					data.map((value, key) => <HistoryCard key={key} value={value} />)}
			</div>
		</div>
	);
};

export default History;
