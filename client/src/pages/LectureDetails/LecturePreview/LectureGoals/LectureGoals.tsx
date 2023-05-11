import { Accordion, AccordionTab } from "primereact/accordion";
import { FC } from "react";
import { FaBrain, FaTools } from "react-icons/fa";
import { PlanFieldModel } from "../../../../data/models/createdLecture.model";
import "./LectureGoals.scss";

type LectureGoalsProps = {
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
};

const LectureGoals: FC<LectureGoalsProps> = ({ goals, requirements }) => {
	return (
		<div className="lecture-goals">
			<Accordion className="flex-1 mt-4" collapseIcon="" expandIcon="">
				<AccordionTab
					headerTemplate={
						<header>
							<h4>What you will learn during this lecture?</h4>
							<FaBrain size={22} />
						</header>
					}
				>
					{goals.map((r) => (
						<div className="row">
							<i className="pi pi-check mr-2" />
							<p>{r.value}</p>
						</div>
					))}
				</AccordionTab>
			</Accordion>

			<Accordion className="flex-1 mt-4" collapseIcon="" expandIcon="">
				<AccordionTab
					headerTemplate={
						<header>
							<h4>Requirements</h4>
							<FaTools size={22} />
						</header>
					}
					contentClassName="tab"
				>
					{requirements.map((r) => (
						<div className="row">
							<i className="pi pi-check mr-2" />
							<p>{r.value}</p>
						</div>
					))}
				</AccordionTab>
			</Accordion>
		</div>
	);
};

export default LectureGoals;
