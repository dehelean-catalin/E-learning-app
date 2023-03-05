import { AxiosResponse } from "axios";
import LectureCard from "common/LectureCard/LectureCard";
import { useAxios } from "config/axiosInstance";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.scss";
const Search = () => {
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("search_query");

	const [lectures, setLectures] = useState([]);

	useEffect(() => {
		axios
			.get<any, AxiosResponse>("/search", {
				params: { searchQuery },
			})
			.then((res) => setLectures(res.data));
	}, [searchQuery]);

	return (
		<div className="search">
			<div className="wrapper">
				{lectures.map((lecture, key) => (
					<LectureCard
						className="search-card"
						bannerClassName="banner"
						contentClassName="content"
						key={key}
						value={lecture}
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
