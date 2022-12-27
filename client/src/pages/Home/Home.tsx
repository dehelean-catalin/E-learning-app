import { FC, useContext, useEffect, useState } from "react";
import { FaRegFrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import FilterList from "../../components/Home/FilterList/FilterList";
import { BasicLecture, ICategory } from "../../resources/models/lectures";
import { BannerNotificationType } from "../../resources/models/usersModel";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import { NotificationActions } from "../../store/redux/notificationReducer";
import styles from "./Home.module.scss";
import HomeSection from "./HomeSection";

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
		getLectures(category, token)
			.then((res) => setLectures(res.data))
			.catch(() => setError(true))
			.finally(() => setIsLoading(false));
	}, [category]);

	const getContent = () => {
		if (error) {
			return (
				<div className={styles.empty}>
					<FaRegFrown />
					<span>This category doesn't have any lectures!</span>
				</div>
			);
		}

		return (
			<>
				<HomeSection
					title="Recomended Lectures"
					value={lectures}
					isLoading={isLoading}
					showDivider
				/>
				<HomeSection
					title="New Lectures"
					value={lectures}
					isLoading={isLoading}
					showDivider
				/>
				<HomeSection
					title="Top Rated Lectures"
					value={lectures}
					isLoading={isLoading}
					showDivider
				/>
				<HomeSection
					title="Most Viewed Lectures"
					value={lectures}
					isLoading={isLoading}
				/>
			</>
		);
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
			<FilterList onFilterChange={(category) => setNavigation(category)} />
			{getContent()}
		</div>
	);
};

export default Home;

const getLectures = (category, token) => {
	return Axios.get("/lectures", {
		params: { category },
		headers: {
			authorization: "Bearer " + token,
		},
	});
};
