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
		"0": {
			value: "",
			placeholder:
				"Ex: Demonstrate how to create a basic web page using HTML ...",
		},
		"1": {
			value: "",
			placeholder:
				"Ex: Explain the fundamentals of HTML, CSS, and JavaScrip ...",
		},
		"2": {
			value: "",
			placeholder:
				"Ex:  Benefits of using TypeScript for large-scale software projects ...",
		},
	});
	const [requirements, setRequirements] = useState({
		"0": {
			value: "",
			placeholder:
				"Ex:  Familiar with a text editor such as Visual Studio Code ...",
		},
		"1": {
			value: "",
			placeholder: "Ex: Basic undersatings of HTML, CSS and Javascript ...",
		},
		"2": {
			value: "",
			placeholder:
				"Ex: Advance knowledge of how React works under the hood ...",
		},
	});

	const onSuccess = (data) => {
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
			<section className="mb-5">
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
				<Button
					type="button"
					label="Add more answers"
					icon="pi pi-plus-circle"
					className="w-5"
					iconPos="left"
					onClick={() => onAddGoalsAnswer(Date.now().toString())}
					disabled={!!Object.values(goals).find((item) => item.value === "")}
				/>
			</section>
			<h2>Requirements</h2>
			<strong>
				What are the requirements or prerequisites for taking your course?
			</strong>
			<p>
				Add the necessary skills, experience, tools or equipment that learners
				should have have before attending your course. If there are no
				requirements, use this space to specify this as such.
			</p>
			<section>
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
				<Button
					type="button"
					label="Add more answers"
					icon="pi pi-plus-circle"
					className="w-5"
					iconPos="left"
					onClick={() => onAddRequirementsAnswer(Date.now().toString())}
					disabled={
						!!Object.values(requirements).find((item) => item.value === "")
					}
				/>
			</section>

			<Button label="Save" />
		</form>
	);
};

export default PlanLecture;
