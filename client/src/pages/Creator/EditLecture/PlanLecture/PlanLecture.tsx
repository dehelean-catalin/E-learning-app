import { Button } from "primereact/button";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../../../../common/Spinner/Spinner";
import InputTextField from "../../../../components/Forms/Inputs/InputTextField/InputTextField";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import {
	getCreatedLecture,
	updateCreatedLecturePlan,
} from "../../../../data/services/creator";
import { useAxios } from "../../../../hooks/useAxios";
import { useFetchData } from "../../../../hooks/useFetchData";
import NotFoundError from "../../../NotFound/NotFoundError/NotFoundError";
import "./PlanLecture.scss";

const PlanLecture = () => {
	const axios = useAxios();
	const { id } = useParams();
	const dispatch = useDispatch();

	const [goals, setGoals] = useState({
		"0": { value: "", placeholder: "Add something..." },
		"1": { value: "", placeholder: "Add something..." },
		"2": { value: "", placeholder: "Add something..." },
	});
	const [requirements, setRequirements] = useState({
		"0": { value: "", placeholder: "Add something..." },
		"1": { value: "", placeholder: "Add something..." },
		"2": { value: "", placeholder: "Add something..." },
	});

	const onSuccess = (data) => {
		console.log(Object.values(data.goals).length);
		if (!!Object.values(data.goals).length) setGoals(data.goals);
		if (!!Object.values(data.requirements).length)
			setRequirements(data.requirements);
	};

	const onMutateSuccess = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Saved",
			})
		);
	};

	const { isLoading, isError } = useFetchData(
		["created-lecture", id],
		() => getCreatedLecture(axios, id),
		{
			onSuccess,
		}
	);

	const { mutate } = useMutation(
		() => updateCreatedLecturePlan(axios, id, { goals, requirements }),
		{
			onSuccess: onMutateSuccess,
		}
	);

	const onAddGoalsAnswer = (key) => {
		if (!Object.values(goals).find((item) => item.value === ""))
			setGoals({ ...goals, [key]: { value: "", placeholder: "" } });
	};

	const onAddRequirementsAnswer = (key) => {
		if (!Object.values(requirements).find((item) => item.value === ""))
			setRequirements({
				...requirements,
				[key]: { value: "", placeholder: "" },
			});
	};

	const onGoalsChange = (e, key) => {
		setGoals({
			...goals,
			[key]: { placeholder: goals[key].placeholder, value: e },
		});
	};

	const onRequirementsChange = (e, key) => {
		setRequirements({
			...requirements,
			[key]: { placeholder: requirements[key].placeholder, value: e },
		});
	};

	const onGoalsDelete = (key) => {
		if (Object.values(goals).length >= 4) {
			delete goals[key];
			setGoals({ ...goals });
		}
	};

	const onRequirementsDelete = (key) => {
		if (Object.values(requirements).length >= 4) {
			delete requirements[key];
			setRequirements({ ...requirements });
		}
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate();
	};

	if (isLoading) return <Spinner className="m-auto h-4rem" />;
	if (isError) return <NotFoundError />;

	return (
		<form className="planning-form" onSubmit={onSubmit}>
			<h2>Planifica Cursul</h2>
			<span>
				The following descriptions will be publicly visible on your Course
				Landing Page and will have a direct impact on your course performance.
				These descriptions will help learners decide if your course is right for
				them.
			</span>
			<strong>What will students learn in your course?</strong>
			<span>
				You must enter at least 4 learning objectives or outcomes that learners
				can expect to achieve after completing your course.
			</span>
			<div className="plan-lecture-inputs">
				{Object.entries(goals).map(([key, item]) => (
					<div key={key} className="planning-field">
						<InputTextField
							value={item.value}
							placeholder={item.placeholder}
							onChange={(e) => onGoalsChange(e, key)}
						/>
						<Button
							icon="pi pi-trash"
							onClick={() => onGoalsDelete(key)}
							disabled={!item.value || Object.values(goals).length < 4}
						/>
					</div>
				))}
			</div>
			<Button
				type="button"
				label="Add more answers"
				icon="pi pi-plus-circle"
				iconPos="left"
				onClick={() => onAddGoalsAnswer(Date.now().toString())}
				disabled={!!Object.values(goals).find((item) => item.value === "")}
			/>
			<div>
				What are the requirements or prerequisites for taking your course? List
				the required skills, experience, tools or equipment learners should have
				prior to taking your course. If there are no requirements, use this
				space as an opportunity to lower the barrier for beginners.
			</div>
			<div>
				{Object.entries(requirements).map(([key, item]) => (
					<div key={key} className="planning-field">
						<InputTextField
							value={item.value}
							placeholder={item.placeholder}
							onChange={(e) => onRequirementsChange(e, key)}
						/>
						<Button
							icon="pi pi-trash"
							onClick={() => onRequirementsDelete(key)}
							disabled={!item.value || Object.values(requirements).length < 4}
						/>
					</div>
				))}
			</div>
			<Button
				type="button"
				label="Add more answers"
				icon="pi pi-plus-circle"
				iconPos="left"
				onClick={() => onAddRequirementsAnswer(Date.now().toString())}
				disabled={
					!!Object.values(requirements).find((item) => item.value === "")
				}
			/>
			<Button label="Save" />
		</form>
	);
};

export default PlanLecture;
