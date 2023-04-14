import { useField } from "formik";
import {
	CreatedLectureModel,
	PlanFieldModel,
} from "../../../../data/models/createdLecture.model";
import { keyOf } from "../../../../helper";
import "./PlanLecture.scss";
import PlanLectureField from "./PlanLectureField";

const PlanLecture = () => {
	const goalsProperty = keyOf<CreatedLectureModel>("goals");
	const requirementsProperty = keyOf<CreatedLectureModel>("requirements");

	const [goalsField] = useField<PlanFieldModel[]>(goalsProperty);
	const [requirementsField] = useField<PlanFieldModel[]>(requirementsProperty);

	return (
		<section className="plan-section">
			<h1>Plan your lecture</h1>
			<p>
				The following descriptions will be visible on your Lecture Overview page
				and will have a direct impact on your course performance. These
				descriptions will help learners decide whether your course is right for
				them or not.
			</p>
			<h2>Goals</h2>
			<strong>What students will learn in your lecture?</strong>
			<p>
				Introduce at least 3 learning goals or outcomes that learners expect to
				achieve after completing your lecture. The goals should be specific and
				measurable.
			</p>
			<PlanLectureField data={goalsField} />
			<h2>Requirements</h2>
			<strong>
				What are the requirements or prerequisites for taking your course?
			</strong>
			<p>
				Add the necessary skills, experience, tools or equipment that learners
				should have have before attending your course. If there are no
				requirements, use this space to specify this as such.
			</p>
			<PlanLectureField data={requirementsField} />
		</section>
	);
};

export default PlanLecture;
