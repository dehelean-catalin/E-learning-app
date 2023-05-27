import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PRButton from "../../../../components/PRButton/PRButton";
import { Content } from "../../../../data/models/createdLecture.model";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import {
	getLastChapter,
	getLectureProgress,
	putLectureLastDate,
} from "../../../../data/services/lecture.service";
import { postLectureProgress } from "../../../../data/services/progress.service";
import { useAxios } from "../../../../hooks/useAxios";
import { useFetchData } from "../../../../hooks/useFetchData";

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

	const { data: isEnrolled } = useFetchData("getLectureProgress", () =>
		getLectureProgress(axios, id)
	);

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

	const { data: chapterId, isLoading } = useFetchData(
		"getLastViewedPage",
		() => getLastChapter(axios, id),
		{
			enabled: !!isEnrolled,
		}
	);

	const chapterIds = content
		.map((c) => c.children.map((d) => d.data.id))
		.flat();

	const { mutate: addWatchingLecture, isLoading: isStartLoading } = useMutation(
		() => postLectureProgress(axios, id, chapterIds),
		{
			onSuccess: handleSuccess,
			onError: handleError,
		}
	);
	const { mutate: handleContinue } = useMutation(
		() => putLectureLastDate(axios, id),
		{
			onSuccess: () => navigate(`/lecture/${id}/overview/${chapterId}`),
			onError: handleError,
		}
	);

	if (isEnrolled)
		return (
			<footer>
				<PRButton
					label="Continue"
					onClick={() => handleContinue()}
					icon={<FaPlay className="mr-2" />}
					loading={isLoading}
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
