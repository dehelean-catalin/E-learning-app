import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import styles from "./History.module.scss";
import HistoryCard from "./HistoryCard";
const History = () => {
	const axiosInstance = useAxios();
	const { data, isLoading, isError } = useFetchQuery(
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
	if (isLoading) {
		return (
			<div className={styles.history}>
				<div className={styles.title}>Recent watched</div>
				<HomeSkeleton />
			</div>
		);
	}

	return (
		<div className={styles.history}>
			<div className={styles.title}>Recent watched</div>
			<div className={styles.content}>
				{data.map((value, key) => (
					<HistoryCard key={key} value={value} />
				))}
			</div>
		</div>
	);
};

export default History;
