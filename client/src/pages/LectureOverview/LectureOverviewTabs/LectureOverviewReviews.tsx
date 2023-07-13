import { useContext } from "react";
import { useParams } from "react-router";
import Spinner from "../../../components/Spinner/Spinner";
import AuthContext from "../../../data/context/auth-context";
import { getLectureReviews } from "../../../data/services/lectureService";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import ReviewChart from "../ReviewChart/ReviewChart";
import "./LectureOverviewReviews.scss";
import LectureReviewForm from "./LectureReviewForm/LectureReviewForm";
import LectureReviews from "./LectureReviews/LectureReviews";

const LectureOverviewReviews = () => {
	const axios = useAxios();
	const { id } = useParams();
	const { userId } = useContext(AuthContext);

	const { data, isLoading, isError } = useFetchData("getLectureReview", () =>
		getLectureReviews(axios, id)
	);

	if (isLoading) return <Spinner />;
	if (isError) return <>Error</>;
	if (!data.length) return <></>;

	const reviews = data.filter((d) => d.authorId !== userId);
	const userReview = data.find((d) => d.authorId === userId);

	return (
		<div className="lecture-overview-reviews">
			<div className="wrapper">
				<h2 className="title">Studend feedback</h2>
				<ReviewChart value={data} />
				<LectureReviewForm value={userReview} />
				<LectureReviews value={reviews} />
			</div>
		</div>
	);
};

export default LectureOverviewReviews;
