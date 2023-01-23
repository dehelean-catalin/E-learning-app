import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import FilterList from "../../components/Home/FilterList/FilterList";
import HomeSection from "../../components/Home/HomeSection/HomeSection";
import HomeFilterSkeleton from "../../components/Home/HomeSkeleton/HomeFilterSkeleton";
import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import { useAxios } from "../../config/axiosInstance";
import { LectureModel } from "../../data/models/lectureModel";
import { NotificationActions } from "../../data/redux/notificationReducer";
import useFetchQuery from "../../hooks/useFetchQuery";
import image from "../../layout/images/empty.png";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./Home.module.scss";

type AxiosResponse = {
	data: LectureModel[];
};

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const param = new URLSearchParams(search).get("category");
	const initParam = !!param ? param : "all";
	const [category, setCategory] = useState(initParam);
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
						Looks like this category don't have any lectures yet
						<br />
						Press bellow button and create one
					</div>
					<NavLink to="/home?category=all">Create lecture</NavLink>
				</NotFound>
			);
		}
		return <HomeSection title="Recomended Lectures" value={data} />;
	};
	return (
		<div className={styles.home}>
			<FilterList
				onFilterChange={(f) => {
					setCategory(f);
				}}
			/>
			{getContent()}
			{/* <HomeSection title="New Lectures" value={data} showDivider />
					<HomeSection title="Top Rated Lectures" value={data} showDivider />
					<HomeSection title="Most Viewed Lectures" value={data} /> */}
		</div>
	);
};

export default Home;
