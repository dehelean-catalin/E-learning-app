import image from "images/empty.png";
import { NavLink } from "react-router-dom";
import GridCard from "../../components/Cards/GridCard/GridCard";
import { getHistoryLectures } from "../../data/services/history.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import HomeSkeleton from "../Home/HomeSkeleton/HomeSkeleton";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./History.module.scss";

const History = () => {
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("history", () =>
		getHistoryLectures(axios)
	);

	if (isLoading) {
		return (
			<div className={styles.history}>
				<div className={styles.title}>Recent watched</div>
				<HomeSkeleton />
			</div>
		);
	}

	if (isError) return <NotFoundError />;

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
		<div className={styles.history}>
			<div className={styles.title}>Recent watched</div>
			<div className={styles.content}>
				{data.map((value, key) => (
					<GridCard key={key} value={value} />
				))}
			</div>
		</div>
	);
};

export default History;
