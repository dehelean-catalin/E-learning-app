import ProfilePicture from "components/ProfilePicture/ProfilePicture";
import { toRelativeTime } from "data/helpers";
import { useAxios } from "data/hooks/useAxios";
import { Review } from "data/models/creatorModel";
import { deleteLectureReview } from "data/services/lectureService";
import { Rating } from "primereact/rating";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import "./LectureReviewCard.scss";

type Props = { value: Omit<Review, "authorId">; canEdit?: boolean };

const LectureReviewCard: FC<Props> = ({ value, canEdit }) => {
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
			<ProfilePicture initials={author} picture={profilePicture} />
			<article>
				<header>
					<h3>{author}</h3>
					{canEdit && (
						<i className="pi pi-trash" onClick={() => handleDelete()}></i>
					)}
				</header>

				<div className="rating-container">
					<Rating value={rating} cancel={false} readOnly />
					<p>{toRelativeTime(new Date(date).getTime())}</p>
				</div>
				<i>{message}</i>
			</article>
		</div>
	);
};

export default LectureReviewCard;
