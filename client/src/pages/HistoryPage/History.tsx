import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../config/axiosInstance";
import styles from "./History.module.scss";
import HistoryCard from "./HistoryCard";
import NotFound from "../NotFound/NotFound";
import image from "../../resources/images/Pasted-20230118-164708_preview_rev_1.png";
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
	const getContent = () => {
		if (data.length) {
			return (
				<div className={styles.content}>
					{data.map((value, key) => (
						<HistoryCard key={key} value={value} />
					))}
				</div>
			);
		}
		// return <NotFound />;
		return;
	};
	if (isLoading) {
		return (
			<div className={styles.history}>
				<div className={styles.title}>Recent watched</div>
				<HomeSkeleton />
			</div>
		);
	}
	if (isError) {
		return <NotFound message="" />;
	}
	if (!data.length) {
		return (
			<NotFound icon={<img src={image} alt="not found" />} message={"add"} />
		);
	}
	return (
		<div className={styles.history}>
			<div className={styles.title}>Recent watched</div>
			{getContent()}
		</div>
	);
};

export default History;
