import { useField } from "formik";
import { CreatedLectureModel } from "../../../../data/models/creatorModel";
import { keyOf } from "../../../../helpers";
import PlanLectureField from "./PlanLectureField";

const PlanLecture = () => {
	const goalsProperty = keyOf<CreatedLectureModel>("goals");
	const requirementsProperty = keyOf<CreatedLectureModel>("requirements");

	const [goalsField] = useField<string[]>(goalsProperty);
	const [requirementsField] = useField<string[]>(requirementsProperty);

	return (
		<>
			<h1>Plan your lecture</h1>
			<p className="mb-4 w-10">
				The following descriptions will be visible on your Lecture Overview page
				and will have a direct impact on your course performance. These
				descriptions will help learners decide whether your course is right for
				them or not.
			</p>
			<h2 className="mb-2">Goals</h2>
			<strong className="mb-2">
				What students will learn in your lecture?
			</strong>
			<p className="mb-2 w-10">
				Introduce at least 3 learning goals or outcomes that learners expect to
				achieve after completing your lecture. The goals should be specific and
				measurable.
			</p>
			<PlanLectureField data={goalsField} />
			<h2 className="mb-2 mt-4">Requirements</h2>
			<strong className="mb-2">
				What are the requirements or prerequisites for taking your course?
			</strong>
			<p className="mb-2 w-10">
				Add the necessary skills, experience, tools or equipment that learners
				should have have before attending your course. If there are no
				requirements, use this space to specify this as such.
			</p>
			<PlanLectureField data={requirementsField} />
		</>
	);
};

export default PlanLecture;
