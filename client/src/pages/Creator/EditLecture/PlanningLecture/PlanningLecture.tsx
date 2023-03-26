import { Button } from "primereact/button";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import InputTextField from "../../../../components/Forms/Inputs/InputTextField/InputTextField";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import {
	getCreatedLecture,
	updateCreatedLecturePlan,
} from "../../../../data/services/creator";
import { useAxios } from "../../../../hooks/useAxios";
import { useFetchData } from "../../../../hooks/useFetchData";

const PlanningLecture = () => {
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
		if (!!data.goals) setGoals(data.goals);
		if (!!data.requirements) setRequirements(data.requirements);
	};

	useFetchData(["created-lecture", id], () => getCreatedLecture(axios, id), {
		onSuccess,
		refetchOnMount: true,
	});

	const onAddGoalsSection = (key) => {
		if (!Object.values(goals).find((item) => item.value === ""))
			setGoals({ ...goals, [key]: { value: "", placeholder: "" } });
	};

	const onAddRequirementsSection = (key) => {
		if (!Object.values(requirements).find((item) => item.value === ""))
			setRequirements({
				...requirements,
				[key]: { value: "", placeholder: "" },
			});
	};

	const { mutate } = useMutation(
		() => updateCreatedLecturePlan(axios, id, { goals, requirements }),
		{
			onSuccess: () => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: "info",
						message: "Saved",
					})
				);
			},
		}
	);

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

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate();
	};

	return (
		<form onSubmit={onSubmit}>
			Planifica Cursul
			<div>Obiectivele Cursului</div>
			{Object.entries(goals).map(([key, item]) => (
				<InputTextField
					key={key}
					value={item.value}
					placeholder={item.placeholder}
					onChange={(e) => onGoalsChange(e, key)}
				/>
			))}
			<Button
				label="Add section"
				onClick={() => onAddGoalsSection(Object.keys(goals).length)}
			/>
			<div>Ce trebuie sa cunosti deja</div>
			{Object.entries(requirements).map(([key, item]) => (
				<InputTextField
					key={key}
					value={item.value}
					placeholder={item.placeholder}
					onChange={(e) => onRequirementsChange(e, key)}
				/>
			))}
			<Button
				label="Add section"
				onClick={() => onAddRequirementsSection(Object.keys(goals).length)}
			/>
			<Button label="Save" />
		</form>
	);
};

export default PlanningLecture;
