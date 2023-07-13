import { AxiosResponse } from "axios";
import PRButton from "components/PRButton/PRButton";
import { Content } from "data/models/creatorModel";
import { VideoProgress } from "data/models/usersModel";
import { NotificationActions } from "data/redux/notificationReducer";
import { useAxios } from "hooks/useAxios";
import { FC, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { postLectureProgress } from "../../../../data/services/monitoringService";

type LectureArticleFooterProps = {
	id: string;
	content: Content[];
};

const LectureArticleFooter: FC<LectureArticleFooterProps> = ({
	id,
	content,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const axios = useAxios();
	const [isEnrolled, setIsEnrolled] = useState("");

	useEffect(() => {
		axios
			.get(`lecture/${id}/progress`)
			.then((res: AxiosResponse<VideoProgress>) => {
				setIsEnrolled(res.data.lastChapter);
			});
	}, [id]);

	const handleSuccess = () => {
		navigate(`/lecture/${id}/overview/${content[0].children[0].data.id}`);
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

	const { mutate: addWatchingLecture, isLoading: isStartLoading } = useMutation(
		() => {
			const chapterIds = content
				.map((c) => c.children.map((d) => d.data.id))
				.flat();
			const firstChapter = content
				.map((c) => c.children.map((d) => d.label))
				.flat();
			return postLectureProgress(axios, id, chapterIds, firstChapter[0]);
		},
		{
			onSuccess: handleSuccess,
			onError: handleError,
		}
	);
	const handleContinue = () =>
		navigate(`/lecture/${id}/overview/${isEnrolled}`);

	if (!!isEnrolled)
		return (
			<footer>
				<PRButton
					label="Continue"
					onClick={() => handleContinue()}
					icon={<FaPlay className="mr-2" />}
				/>
			</footer>
		);

	return (
		<footer>
			<PRButton
				label="Start now"
				onClick={() => {
					addWatchingLecture();
				}}
				icon={<FaPlay className="mr-2" />}
				loading={isStartLoading}
			/>
		</footer>
	);
};

export default LectureArticleFooter;
