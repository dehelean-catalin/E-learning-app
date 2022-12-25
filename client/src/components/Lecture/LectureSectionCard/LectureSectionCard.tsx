import { FC } from "react";
import { LectureItem } from "../../../resources/models/lectures";
import { Step, Stepper, StepLabel, StepContent } from "@mui/material";
import styles from "./LectureSectionCard.module.scss";
import ReviewList from "../ReviewList/ReviewList";
type Props = {
	item: LectureItem;
};
const LectureSectionCard: FC<Props> = ({ item }) => {
	const { title, description } = item;
	return (
		<div className={styles["lecture-item"]}>
			<div className={styles["section-title"]}>{title}</div>
			<div>{description}</div>

			{item?.courseContent && (
				<Stepper className={styles["course-list"]} orientation="vertical">
					{item.courseContent.map((step) => (
						<Step key={step.title}>
							<StepLabel>
								<div>{step.title}</div>
								<div>{step.items.length} 20min</div>
							</StepLabel>
							{step.items.map(({ title, time }) => (
								<StepContent key={title}>
									<div>{title}</div>
									<div>{time}</div>
								</StepContent>
							))}
						</Step>
					))}
				</Stepper>
			)}
			{item.items && <ReviewList items={item.items} />}
		</div>
	);
};

export default LectureSectionCard;
