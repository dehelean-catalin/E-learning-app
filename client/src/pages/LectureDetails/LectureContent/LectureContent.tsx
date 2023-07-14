import { Accordion, AccordionTab } from "primereact/accordion";
import { FC } from "react";
import { RxVideo } from "react-icons/rx";
import {
	convertSecondsToTime,
	convertSecondsToTimeString,
	lectureDurationBasedOnContent,
} from "../../../data/helpers";
import { Content } from "../../../data/models/creatorModel";
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
				{value.map(({ label, children }, key) => (
					<AccordionTab
						headerTemplate={
							<AccordionTabHeader label={label} children={children} />
						}
						key={key}
					>
						{children.map((children) => (
							<div className="content-item" key={children.data.id}>
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
