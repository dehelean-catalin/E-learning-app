import { AxiosError } from "axios";
import { NotificationActions } from "data/redux/notificationReducer";
import { getLectures } from "data/services";
import { useFetchData } from "hooks/useFetchData";
import image from "images/empty.png";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";
import { Category } from "../../data/models/createdLecture.model";
import { useAxios } from "../../hooks/useAxios";
import NotFound from "../NotFound/NotFound";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import FilterList from "./FilterList/FilterList";
import styles from "./Home.module.scss";
import HomeSection from "./HomeSection/HomeSection";
import HomeFilterSkeleton from "./HomeSkeleton/HomeFilterSkeleton";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const categoryParam = searchParams.get("category");
	const initialParam = !!categoryParam ? categoryParam : Category.ALL;

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
		["home", category],
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

	if (isError) return <NotFoundError />;

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
		return <HomeSection title="Recommended Lectures" value={data} />;
	};
	return (
		<div className={styles.home}>
			<FilterList onFilterChange={setCategory} />
			{getContent()}
		</div>
	);
};

export default Home;
