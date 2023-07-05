import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { FC } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
	Content,
	ContentData,
	VideoProgressItem,
} from "../../../data/models/createdLecture.model";
import { RootState } from "../../../data/redux/reducers";
import { convertSecondsToTime } from "../../../helpers";
import { useAxios } from "../../../hooks/useAxios";
import "./LectureOverviewChapters.scss";

type LectureOverviewChaptersProps = {
	id: string;
	data: Content[];
};

const LectureOverviewChapters: FC<LectureOverviewChaptersProps> = ({
	id,
	data,
}) => {
	const navigate = useNavigate();
	const axios = useAxios();
	const { chapterId } = useParams();

	const progress = useSelector<RootState, VideoProgressItem[]>(
		(s) => s.progressReducer.data
	);

	const handleTabNavigation = (label: string, data: ContentData) => {
		if (data.id === chapterId) return;
		navigate(`/lecture/${id}/overview/${data.id}`);
		axios.put(`lectures/${id}/last-chapter`, {
			lastChapter: data.id,
			lastName: label,
		});
	};

	return (
		<Accordion
			multiple
			className="lecture-overview-chapters"
			activeIndex={[0]}
			onTabOpen={(e) => console.log(e.index)}
			onTabClose={(e) => console.log(e.index)}
		>
			{data.map(({ label, children }, index) => (
				<AccordionTab
					header={
						<h4>
							Section {index + 1}: {label}
						</h4>
					}
					key={index}
				>
					{children.map(({ label, data }, index2) => (
						<article
							key={index2}
							onClick={() => handleTabNavigation(label, data)}
							className={classNames({
								"surface-hover": data.id === chapterId,
							})}
						>
							<div className="right">
								{Math.round(data.duration - data.duration / 20) <=
								Math.round(progress?.find((p) => p.id === data.id).total) ? (
									<i className="pi pi-check-square align-self-center text-primary" />
								) : (
									<i className="pi pi-stop align-self-center" />
								)}
								<div className="details">
									{label}
									<div className="time">
										<BsFillPlayCircleFill size={14} />
										{convertSecondsToTime(data.duration)}
									</div>
								</div>
							</div>
							<video muted={false}>
								<source src={data.content} type="video/mp4" />
								<source src={data.content} type="video/webm" />
								Your browser does not support the video tag.
							</video>
						</article>
					))}
				</AccordionTab>
			))}
		</Accordion>
	);
};

export default LectureOverviewChapters;
