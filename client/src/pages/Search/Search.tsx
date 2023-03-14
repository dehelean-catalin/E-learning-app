import LectureCard from "common/LectureCard/LectureCard";
import Spinner from "common/Spinner/Spinner";
import { useAxios } from "config/axiosInstance";
import { LectureModel } from "data/models/lectureModel";
import {
	DateParams,
	DurationParams,
	LangParams,
	QueryFilterParams,
	RatingParams,
} from "data/models/search/searchFilterModel";
import { getSearchLectures } from "data/services/search/_getSearchLectures";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useSearchParams } from "react-router-dom";
import SearchFilterSection from "./components/SearchFilterSection";
import "./Search.scss";

const Search = () => {
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("searchQuery");
	const rating = searchParams.get("rating") as RatingParams;
	const language = searchParams.get("language") as LangParams;
	const duration = searchParams.get("duration") as DurationParams;
	const date = searchParams.get("date") as DateParams;

	const { data, isError, isLoading } = useFetchData<LectureModel[]>(
		["search", [searchQuery, rating, language, duration, date]],
		() => getSearchLectures(axios, searchParams as QueryFilterParams)
	);

	if (isLoading) {
		return <Spinner />;
	}
	if (isError) {
		return <NotFoundError />;
	}

	return (
		<div className="search">
			<div className="wrapper">
				<SearchFilterSection />
				{data?.map((lecture, key) => (
					<LectureCard
						key={key}
						value={lecture}
						className="search-card"
						bannerClassName="banner"
						contentClassName="content"
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
