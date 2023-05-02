import { Accordion, AccordionTab } from "primereact/accordion";
import { FC } from "react";
import { RxVideo } from "react-icons/rx";
import { Content } from "../../../data/models/createdLecture.model";
import {
	convertSecondsToTime,
	convertSecondsToTimeString,
	lectureDurationBasedOnContent,
} from "../../../helpers";
import AccordionTabHeader from "./AccordionTabHeader";
import "./LectureContent.scss";

type LectureContentProps = {
	value: Content[];
};

const LectureContent: FC<LectureContentProps> = ({ value }) => {
	const lectureDuration = lectureDurationBasedOnContent(value);
	const convertedDuration = convertSecondsToTime(lectureDuration);
	const numberOfLectures = value.reduce((a, b) => b.children.length + a, 0);

	return (
		<section className="lecture-content">
			<h2>Lecture Content</h2>
			<p>
				{value.length} sections - {numberOfLectures} lectures -
				{convertedDuration} of content
			</p>

			<Accordion multiple>
				{value.map(({ label, children }) => (
					<AccordionTab
						headerTemplate={
							<AccordionTabHeader label={label} children={children} />
						}
					>
						{children.map((children) => (
							<div className="content-item">
								<div className="content-label">
									<RxVideo className="mr-3" />
									{children.label}
								</div>
								{convertSecondsToTimeString(children.data.duration)}
							</div>
						))}
					</AccordionTab>
				))}
			</Accordion>
		</section>
	);
};

export default LectureContent;
