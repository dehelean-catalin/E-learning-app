import ProfilePicture from "components/ProfilePicture/ProfilePicture";
import { toRelativeTime } from "data/helpers";
import { useAxios } from "data/hooks/useAxios";
import { Review } from "data/models/creatorModel";
import { deleteLectureReview } from "data/services/lectureService";
import { Rating } from "primereact/rating";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import auth from "../../../../config/firebase.config";
import "./LectureReviewCard.scss";

type Props = { value: Review; showActions?: boolean };

const LectureReviewCard: FC<Props> = ({ value, showActions }) => {
	const { author, message, date, rating, profilePicture } = value;
	const { id } = useParams();
	const axios = useAxios();
	const queryClient = useQueryClient();

	const { mutate: handleDelete } = useMutation(
		"deleteLectureReview",
		() => deleteLectureReview(axios, id, rating),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getLectureReview");
				queryClient.fetchQuery("getLectureReview");
			},
		}
	);

	return (
		<div className="review-card">
			<div>
				<ProfilePicture initials={author} picture={profilePicture} />
			</div>
			<div className="rating-container">
				<p className="font-semibold">{author}</p>
				<div className="flex align-items-center gap-2">
					<Rating value={rating} cancel={false} readOnly />
					<p className="text-surface-card">
						{toRelativeTime(new Date(date).getTime())}
					</p>
				</div>

				<p>{message}</p>
			</div>
			{showActions && value.authorId === auth?.currentUser.uid && (
				<i className="pi pi-trash" onClick={() => handleDelete()}></i>
			)}
		</div>
	);
};

export default LectureReviewCard;
