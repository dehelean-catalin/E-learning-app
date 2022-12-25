import { FC, useContext, useEffect, useState } from "react";
import { BasicLecture, ICategory } from "../../resources/models/lectures";
import { Axios } from "../../resources/routes";
import { useLocation, useNavigate } from "react-router";
import FilterList from "../../components/Home/FilterList/FilterList";
import LectureList from "../../components/Home/LectureCard/LectureList";
import styles from "./Home.module.scss";
import LectureSkeleton from "../../components/Home/Skeleton/LectureSkeleton";
import AuthContext from "../../store/context/auth-context";
import { Divider } from "@mui/material";
import { FaRegFrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../store/redux/notificationReducer";
import { BannerNotificationType } from "../../resources/models/models";

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const category = new URLSearchParams(search).get("category");
	const { token } = useContext(AuthContext);
	const [lectures, setLectures] = useState<BasicLecture[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		Axios.get("/lectures", {
			params: { category },
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((res) => setLectures(res.data))
			.catch((err) => setError(true))
			.finally(() => setIsLoading(false));
	}, [category]);

	const getLectures = () => {
		if (isLoading) return <LectureSkeleton />;
		return <LectureList value={lectures} />;
	};
	const setNavigation = (f: ICategory) => {
		Axios.get("/lectures", {
			params: { category: f },
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				setLectures(res.data);
				setError(false);
				navigate(`/home?category=${f}`);
			})
			.catch((err) => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: err.response.data?.message,
					})
				);
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<div className={styles.home}>
			<FilterList onFilterChange={(f) => setNavigation(f)} />
			{error ? (
				<div className={styles.empty}>
					<FaRegFrown />
					<span>This category doesn't have any lectures!</span>
				</div>
			) : (
				<>
					<div className={styles["section-title"]}>Recomanded Lectures</div>
					<div className={styles["lecture-list"]}>{getLectures()}</div>
					<Divider />
					<div className={styles["section-title"]}>New Lectures</div>
					<div className={styles["lecture-list"]}>{getLectures()}</div>
					<Divider />
					<div className={styles["section-title"]}>Top Rated Lectures</div>
					<div className={styles["lecture-list"]}>{getLectures()}</div>
					<Divider />
					<div className={styles["section-title"]}>Most Viewed Lectures</div>
					<div className={styles["lecture-list"]}>{getLectures()}</div>
				</>
			)}
		</div>
	);
};

export default Home;
