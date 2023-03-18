import { NavLink } from "react-router-dom";
import HistoryCard from "../../components/History/HistoryCard/HistoryCard";
import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import { useAxios } from "../../hooks/useAxios";
import useFetchQuery from "../../hooks/useFetchQuery";
import image from "../../layout/images/empty.png";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./History.module.scss";
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
	if (isError) {
		return <NotFoundError />;
	}
	const getContent = () => {
		if (!data.length) {
			return (
				<NotFound>
					<img src={image} alt="not found" />
					<strong>No lecture found</strong>
					<div>
						Looks like you didn't watch any lecture yet
						<br />
						Go back to your home page and start watching
					</div>
					<NavLink to="/home?category=all">Start watching</NavLink>
				</NotFound>
			);
		}
		return (
			<div className={styles.content}>
				{data.map((value, key) => (
					<HistoryCard key={key} value={value} />
				))}
			</div>
		);
	};

	return (
		<div className={styles.history}>
			<div className={styles.title}>Recent watched</div>
			{getContent()}
		</div>
	);
};

export default History;
