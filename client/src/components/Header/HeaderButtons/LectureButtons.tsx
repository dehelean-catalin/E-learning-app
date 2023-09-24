import { CreatedLectureModel } from "data/models/creatorModel";
import { VideoProgressItem } from "data/models/usersModel";
import { RootState } from "data/redux/store";
import { LECTURE_OVERVIEW_ROUTE } from "data/routes/baseRoutes";
import { Knob } from "primereact/knob";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useMatch } from "react-router";

const LectureButtons = () => {
	const progressRef = useRef(null);
	const isMatchingLectureOverview = !!useMatch(LECTURE_OVERVIEW_ROUTE);
	const queryClient = useQueryClient();

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

	const knobValue = +((completed / duration.length) * 100).toFixed(0);

	return (
		<>
			<div
				className="toogleIcon cursor-pointer flex gap-2 align-items-center"
				onClick={(e) => progressRef.current.toggle(e)}
			>
				<Knob
					value={knobValue}
					valueTemplate={"{value}%"}
					strokeWidth={8}
					size={45}
				/>
				<strong>Progress</strong>
			</div>

			<OverlayPanel ref={progressRef} className={"profile-overlay"}>
				<h4>
					{completed} of {progress?.length} completed
				</h4>
			</OverlayPanel>
		</>
	);
};

export default LectureButtons;
