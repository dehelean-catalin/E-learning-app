import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LectureCard } from "../../../data/models/lectureModel";
import { useAxios } from "../../../hooks/useAxios";
import { CustomRating } from "../../CustomRating/CustomRating";
import "./LectureListCard.scss";

type Props = {
	value: LectureCard;
	className?: string;
	icon: JSX.Element;
};

const LectureListCard: FC<Props> = ({ value, className, icon }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const queryClient = useQueryClient();

	const {
		id,
		title,
		author,
		caption,
		rating,
		enrolledUsers,
		numberOfRatings,
		description,
	} = value;
	const axiosInstance = useAxios();

	const { mutate } = useMutation(
		() => axiosInstance.delete(`user/save-lecture/${id}`),
		{
			onSuccess: () => queryClient.invalidateQueries("save-lecture"),
		}
	);

	return (
		<div className="lecture-list-card">
			<img
				src={caption}
				alt="caption"
				onClick={() => navigate(`/lecture/${id}`)}
			/>

			<div className="content">
				<h2>
					<span>{title}</span>
				</h2>
				<p>{author}</p>

				<CustomRating
					rating={rating}
					numberOfRates={numberOfRatings}
					enrolledUsers={enrolledUsers}
				/>
				<p className="desc">{description}</p>
			</div>
			{icon}
		</div>
	);
};

export default LectureListCard;
