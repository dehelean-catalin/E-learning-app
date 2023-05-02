import { Button } from "primereact/button";
import { FC, useContext } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CustomRating } from "../../../../components/CustomRating/CustomRating";
import Spinner from "../../../../components/Spinner/Spinner";
import AuthContext from "../../../../data/context/auth-context";
import { CreatedLectureModel } from "../../../../data/models/createdLecture.model";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import { getLastViewedLecturePage } from "../../../../data/services/lecture/lecture.service";
import { postWatchingLecture } from "../../../../data/services/watching.service";
import { useAxios } from "../../../../hooks/useAxios";
import { useFetchData } from "../../../../hooks/useFetchData";
import NotFoundError from "../../../NotFound/NotFoundError/NotFoundError";
import "./LectureHeader.scss";
type Props = {
	value: CreatedLectureModel;
};

const LectureHeader: FC<Props> = ({ value }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const axios = useAxios();

	const { userId } = useContext(AuthContext);
	const { enrolledUsers, id } = value;

	const isEnrolled = enrolledUsers.includes(userId);

	const handleSuccess = () => {
		navigate(`/lecture/${id}/overview?page=${page}`);
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Enrolled successfully",
			})
		);
	};

	const handleError = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				message: "Something went wrong!",
			})
		);
	};

	const {
		data: page,
		isLoading,
		isError,
	} = useFetchData(
		"getLastViewedPage",
		() => getLastViewedLecturePage(axios, id),
		{
			enabled: isEnrolled,
		}
	);

	const { mutate: addWatchingLecture, isLoading: isStartLoading } = useMutation(
		() => postWatchingLecture(axios, id, value.content),
		{ onSuccess: handleSuccess, onError: handleError }
	);

	const handleContinue = () => {
		navigate(`/lecture/${id}/overview?page=${page}`);
	};

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	const {
		publish: { category, caption, title, description, author, language },
		reviews,
		lastUpdate,
	} = value;

	return (
		<article className="lecture-article">
			<img src={caption} alt="not found" />

			<div className="details">
				<div className="top">
					<span className="text-primary">{category}</span>
					<h1>{title}</h1>
					<p>{description}</p>
					<p>
						Created by:
						<span className="text-primary">{author}</span>
					</p>
					<CustomRating
						reviews={reviews}
						enrolledUsers={enrolledUsers.length}
					/>
					<div>
						Last update: <span>{lastUpdate}</span>
						<span>{language}</span>
					</div>
				</div>

				<div className="btns">
					<Button
						onClick={() => console.log("not implemented")}
						iconPos="left"
						icon="pi pi-bookmark"
						disabled={true}
					>
						Save
					</Button>
					{!isEnrolled ? (
						<Button onClick={handleContinue} iconPos="left" icon="pi pi-play">
							Continue
						</Button>
					) : (
						<Button
							onClick={() => {
								addWatchingLecture();
							}}
							iconPos="left"
							loading={isStartLoading}
						>
							Start
						</Button>
					)}
				</div>
			</div>
		</article>
	);
};

export default LectureHeader;
