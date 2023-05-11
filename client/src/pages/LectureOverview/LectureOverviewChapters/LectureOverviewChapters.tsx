import { Accordion, AccordionTab } from "primereact/accordion";
import { FC } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useNavigate } from "react-router";
import Spinner from "../../../components/Spinner/Spinner";
import { Content } from "../../../data/models/createdLecture.model";
import { getLectureProgress } from "../../../data/services/lecture.service";
import { convertSecondsToTime } from "../../../helpers";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
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

	const {
		data: totalProgress,
		isLoading,
		isError,
	} = useFetchData("getLectureProgress", () => getLectureProgress(axios, id), {
		initialData: [],
	});

	if (isLoading)
		return (
			<div className="lecture-overview-chapters">
				<Spinner />
			</div>
		);
	if (isError) return <Spinner />;

	return (
		<Accordion multiple className="lecture-overview-chapters">
			{data.map(({ label, children }, index) => (
				<AccordionTab
					header={
						<h4>
							Section {index + 1}: {label}
						</h4>
					}
				>
					{children.map(({ label, data }, index2) => (
						<article
							onClick={() => {
								navigate(`/lecture/${id}/overview/${data.id}`);
							}}
						>
							<div className="right">
								{Math.round(
									data.duration -
										totalProgress.find((t) => t.id === data.id).total / 20
								) <=
								Math.round(
									totalProgress.find((t) => t.id === data.id).total
								) ? (
									<ImCheckboxChecked />
								) : (
									<ImCheckboxUnchecked />
								)}

								<div className="details">
									{label}
									<div className="time">
										<BsFillPlayCircleFill size={14} />
										{convertSecondsToTime(data.duration)}
									</div>
								</div>
							</div>
							<video width="70px" muted={false}>
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
