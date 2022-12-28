import { AxiosError } from "axios";
import { FC, useState } from "react";
import { FaRegFrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import FilterList from "../../components/Home/FilterList/FilterList";
import LectureSkeleton from "../../components/Home/Skeleton/LectureSkeleton";
import useFetchQuery from "../../hooks/useFetchQuery";
import { BasicLecture } from "../../resources/models/lectures";
import { BannerNotificationType } from "../../resources/models/usersModel";
import { Axios } from "../../resources/routes";
import { NotificationActions } from "../../store/redux/notificationReducer";
import styles from "./Home.module.scss";
import HomeSection from "./HomeSection";

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const param = new URLSearchParams(search).get("category");
	const [category, setCategory] = useState(param);
	const { data, isError, isLoading } = useFetchQuery(
		["/lectures", category],
		() => {
			return Axios.get<any, { data: BasicLecture[] }>("/lectures", {
				params: { category },
			}).then((res) => res.data);
		},
		{
			initialData: [],
			onSuccess: () => navigate(`/home?category=${category}`),
			onError: (err: AxiosError<{ code: string; message: string }>) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: err.response.data?.message,
					})
				),
		}
	);

	if (isLoading) {
		return (
			<div className={styles.home}>
				<LectureSkeleton />
			</div>
		);
	}
	if (isError) {
		return (
			<div className={styles.home}>
				<FilterList
					onFilterChange={(f) => {
						setCategory(f);
					}}
				/>
				<div className={styles.empty}>
					<FaRegFrown />
					<span>This category doesn't have any lectures!</span>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.home}>
			<FilterList
				onFilterChange={(f) => {
					setCategory(f);
				}}
			/>
			{data.length && (
				<>
					<HomeSection title="Recomended Lectures" value={data} showDivider />
					<HomeSection title="New Lectures" value={data} showDivider />
					<HomeSection title="Top Rated Lectures" value={data} showDivider />
					<HomeSection title="Most Viewed Lectures" value={data} />
				</>
			)}
		</div>
	);
};

export default Home;
