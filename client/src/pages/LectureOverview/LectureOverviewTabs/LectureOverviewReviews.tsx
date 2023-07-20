import { memo, useState } from "react";
import { useParams } from "react-router";
import LeaveRatingDialog from "../../../components/Header/HeaderButtons/LeaveRatingDialog";
import PRButton from "../../../components/PRButton/PRButton";
import Spinner from "../../../components/Spinner/Spinner";
import auth from "../../../config/firebase.config";
import { useAxios } from "../../../data/hooks/useAxios";
import { useFetchData } from "../../../data/hooks/useFetchData";
import { getLectureReviews } from "../../../data/services/lectureService";
import ReviewChart from "../ReviewChart/ReviewChart";
import "./LectureOverviewReviews.scss";
import LectureReviews from "./LectureReviews/LectureReviews";

const LectureOverviewReviews = () => {
	const axios = useAxios();
	const { id } = useParams();
	const uid = auth?.currentUser.uid;
	const [visibile, setVisible] = useState(false);

	const { data, isLoading, isError } = useFetchData("getLectureReview", () =>
		getLectureReviews(axios, id)
	);

	if (isLoading) return <Spinner />;
	if (isError) return <>Error</>;
	if (!data.length) return <></>;

	const index = data.findIndex((d) => d?.authorId === uid);
	if (index > -1) {
		const myReview = data[index];
		data.splice(index, 1);
		data.unshift(myReview);
	}

	return (
		<div className="lecture-overview-reviews">
			<div className="flex justify-content-between">
				<h3 className="title">Reviews</h3>
				{index === -1 && (
					<PRButton
						label="Add review"
						icon="pi pi-pencil"
						className="surface-card"
						onClick={() => setVisible(true)}
					/>
				)}
			</div>

			<ReviewChart value={data} />
			<LectureReviews value={data} />
			<LeaveRatingDialog visible={visibile} onHide={() => setVisible(false)} />
		</div>
	);
};

export default memo(LectureOverviewReviews);
