import { AxiosError } from "axios";
import { FC, useState } from "react";
import { FaRegFrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Divider from "../../components/common/Divider";
import FilterList from "../../components/Home/FilterList/FilterList";
import HomeFilterSkeleton from "../../components/Home/HomeSkeleton/HomeFilterSkeleton";
import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import { LectureModel } from "../../resources/models/lectureModel";
import { NotificationActions } from "../../store/redux/notificationReducer";
import styles from "./Home.module.scss";
import HomeSection from "./HomeSection";
type AxiosResponse = {
	data: LectureModel[];
};
const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const param = new URLSearchParams(search).get("category");
	const [category, setCategory] = useState(param);
	const axiosInstance = useAxios();
	const { data, isError, isLoading } = useFetchQuery(
		["/lectures", category],
		() => {
			return axiosInstance
				.get<any, AxiosResponse>("/lectures", {
					params: { category },
				})
				.then((res) => res.data);
		},
		{
			initialData: [],
			onSuccess: () => navigate(`/home?category=${category}`),
			onError: (err: AxiosError<{ code: string; message: string }>) => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
						message: err.response.data?.message,
					})
				);
				navigate(`/home?category=${category}`);
			},
		}
	);

	if (isLoading) {
		return (
			<div className={styles.home}>
				<HomeFilterSkeleton />
				<HomeSkeleton />
				<Divider margin="20px" borderWidth="2px" color="#272727" />
				<HomeSkeleton />
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
