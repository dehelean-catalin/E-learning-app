import { useAxios } from "hooks/useAxios";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useSearchParams } from "react-router-dom";
import LectureListActionBar from "../../components/Cards/LectureCard/LectureListActionBar";
import LectureListCard from "../../components/Cards/LectureCard/LectureListCard";
import Spinner from "../../components/Spinner/Spinner";
import {
	DateParams,
	DurationParams,
	LangParams,
	QueryFilterParams,
	RatingParams,
} from "../../data/models/lectureModel";
import { getSearchLectures } from "../../data/services/lectureService";
import "./Search.scss";
import SearchFilterSection from "./components/SearchFilterSection";

const Search = () => {
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("searchQuery");
	const rating = searchParams.get("rating") as RatingParams;
	const language = searchParams.get("language") as LangParams;
	const duration = searchParams.get("duration") as DurationParams;
	const date = searchParams.get("date") as DateParams;

	const { data, isError, isLoading } = useFetchData(
		["getSearchLectures", [searchQuery, rating, language, duration, date]],
		() => getSearchLectures(axios, searchParams as QueryFilterParams)
	);

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<div className="search">
			<div className="wrapper">
				<SearchFilterSection />
				{isLoading ? (
					<Spinner />
				) : data.length ? (
					data.map((lecture, key) => (
						<LectureListCard
							key={key}
							value={lecture}
							icon={<LectureListActionBar id={lecture.id} />}
						/>
					))
				) : (
					<div className="m-auto">No lecture found</div>
				)}
			</div>
		</div>
	);
};

export default Search;
