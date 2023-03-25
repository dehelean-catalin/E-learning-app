import CreatedLectureCard from "components/Cards/CreatedLectureCard/CreatedLectureCard";
import { useAxios } from "hooks/useAxios";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import "./Dashboard.scss";

import Spinner from "../../../common/Spinner/Spinner";
import { getCreatedLectures } from "../../../data/services/creator";
import { getCreatedLecturesLength } from "../../../data/services/creator/_getCreatedLecturesLength.service";
import { useFetchData } from "../../../hooks/useFetchData";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";

const Dashboard = () => {
	const axios = useAxios();
	const [lectureId, setLectureId] = useState(null);
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState("initial");

	const { data: createdLecturesLength } = useFetchData(["items", axios], () =>
		getCreatedLecturesLength(axios)
	);

	const { data, isLoading, isError } = useFetchData(
		["dashboard", lectureId, direction, createdLecturesLength],
		() => getCreatedLectures(axios, lectureId, direction, createdLecturesLength)
	);

	const onPageChange = (e) => {
		if (e.first > page) {
			setPage(e.first);
			setLectureId(data[data.length - 1].id);
			setDirection("forward");
		}
		if (e.first < page && e.first !== 0) {
			setPage(e.first);
			setLectureId(data[0].id);
			setDirection("backward");
		}
		if (e.first === 0) {
			setPage(e.first);
			setDirection("initial");
		}
		if (e.page === Math.ceil(createdLecturesLength / 4) - 1) {
			setDirection("final");
		}
	};

	if (isLoading) return <Spinner />;
	if (!data.length) return <>Empty</>;
	if (isError) return <NotFoundError />;

	return (
		<div className="dashboard">
			<div className="wrapper">
				{data?.map((lecture, key) => (
					<CreatedLectureCard key={key} data={lecture} />
				))}
			</div>
			<Paginator
				first={page}
				rows={4}
				className="mt-3"
				totalRecords={createdLecturesLength}
				onPageChange={onPageChange}
				template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			></Paginator>
		</div>
	);
};

export default Dashboard;
