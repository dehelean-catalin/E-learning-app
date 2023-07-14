import AuthContext from "data/context/auth-context";
import { CreatedLectureModel, Review } from "data/models/creatorModel";
import { VideoProgressItem } from "data/models/usersModel";
import { RootState } from "data/redux/store";
import { LECTURE_OVERVIEW_ROUTE } from "data/routes/baseRoutes";
import { Knob } from "primereact/knob";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useMatch } from "react-router";
import PRButton from "../../PRButton/PRButton";
import LeaveRatingDialog from "./LeaveRatingDialog";

const LectureButtons = () => {
	const progressRef = useRef(null);
	const { userId } = useContext(AuthContext);
	const isMatchingLectureOverview = !!useMatch(LECTURE_OVERVIEW_ROUTE);
	const queryClient = useQueryClient();

	const data = queryClient.getQueryData("getLectureReview") as Review[];
	const isLectureReviewed = data?.find((d) => d.authorId === userId);
	const [visibile, setVisible] = useState(false);
	const progress = useSelector<RootState, VideoProgressItem[]>(
		(s) => s.progressReducer.data
	);

	if (!isMatchingLectureOverview) return;

	const rating = queryClient.getQueryData(
		"getLectureOverview"
	) as CreatedLectureModel;

	const duration =
		rating?.content
			.map((c) => c.children.map((i) => i.data?.duration))
			.flat() ?? [];

	const totalProgress = progress?.map((p) => p.total);

	const completed = duration?.filter(
		(d, index) => Math.round(d - d / 20) <= Math.round(totalProgress[index])
	).length;

	return (
		<>
			{!isLectureReviewed && (
				<PRButton
					label="Leave a rating"
					icon="pi pi-star"
					className="bg-transparent"
					onClick={() => setVisible(true)}
				/>
			)}
			<div
				className="toogleIcon cursor-pointer flex gap-2 align-items-center"
				onClick={(e) => progressRef.current.toggle(e)}
			>
				<Knob
					value={(completed / duration.length) * 100}
					valueTemplate={"{value}%"}
					strokeWidth={8}
					size={45}
				/>
				<strong>Progress</strong>
			</div>

			<OverlayPanel ref={progressRef} className={"profile-overlay"}>
				<h4>
					{completed} of {progress.length} completed
				</h4>
			</OverlayPanel>
			<LeaveRatingDialog visible={visibile} onHide={() => setVisible(false)} />
		</>
	);
};

export default LectureButtons;
