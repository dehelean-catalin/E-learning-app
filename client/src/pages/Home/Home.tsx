import { AxiosError } from "axios";
import { NotificationActions } from "data/redux/notificationReducer";
import { getLectures } from "data/services/home/_getLectures";
import { useFetchData } from "hooks/useFetchData";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";
import FilterList from "../../components/Home/FilterList/FilterList";
import HomeSection from "../../components/Home/HomeSection/HomeSection";
import HomeFilterSkeleton from "../../components/Home/HomeSkeleton/HomeFilterSkeleton";
import HomeSkeleton from "../../components/Home/HomeSkeleton/HomeSkeleton";
import { useAxios } from "../../config/axiosInstance";
import image from "../../layout/images/empty.png";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import styles from "./Home.module.scss";

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const categoryParam = searchParams.get("category");
	const initialParam = !!categoryParam ? categoryParam : "all";

	const [category, setCategory] = useState(initialParam);

	const onSuccess = () => {
		navigate(`/home?category=${category}`);
	};
	const onError = (err: AxiosError<{ message: string }>) => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				message: err.response.data?.message,
			})
		);
		navigate(`/home?category=${category}`);
	};

	const { data, isError, isLoading } = useFetchData(
		["/lectures", category],
		() => getLectures(axios, { category }),
		{
			onSuccess,
			onError,
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
					<NavLink to="/create">Create lecture</NavLink>
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
