import { FC, FormEvent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AuthContext from "../../../../data/context/auth-context";
import { Review } from "../../../../data/models/createdLecture.model";
import { AccountDataState } from "../../../../data/redux/account/AccountReducer";
import { RootState } from "../../../../data/redux/reducers";
import { postLectureReview } from "../../../../data/services/lecture.service";
import { useAxios } from "../../../../hooks/useAxios";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviewForm.scss";

const LectureReviewForm: FC<{ value: Review }> = ({ value }) => {
	const axios = useAxios();
	const { id } = useParams();
	const [rating, setRating] = useState(null);
	const [message, setMessage] = useState("");
	const queryClient = useQueryClient();
	const { userId } = useContext(AuthContext);
	const { displayName, profilePicture } = useSelector<
		RootState,
		AccountDataState
	>((s) => s.accountReducer.data);

	const handleCancel = () => {
		setMessage("");
		setRating(0);
	};

	const { mutate: handleSubmit, isLoading } = useMutation(
		"postLectureReview",
		(e: FormEvent) => {
			e.preventDefault();
			if (!message) return;
			if (!rating) return;

			return postLectureReview(axios, id, {
				author: displayName,
				profilePicture,
				message,
				rating,
				authorId: userId,
			});
		},
		{
			onSuccess: () => queryClient.invalidateQueries("getLectureReview"),
		}
	);
	if (!value) return;

	return (
		<div className="review-form">
			<h2>Your feedback</h2>
			<LectureReviewCard value={value} canEdit />
		</div>
	);
};

export default LectureReviewForm;
