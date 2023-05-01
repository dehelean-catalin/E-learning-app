import { CreatedLectureModel } from "data/models/createdLecture.model";
import { useFormikContext } from "formik";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
	formattedVideoDuration,
	lectureDurationBasedOnContent,
} from "../../../../helpers";
import { useAxios } from "../../../../hooks/useAxios";
import "./EditLectureHeader.scss";

const EditLectureHeader = () => {
	const { submitForm, values } = useFormikContext<CreatedLectureModel>();
	const { id } = useParams();
	const axios = useAxios();
	const navigate = useNavigate();

	const { publish, requirements, goals, content } = values;

	const lectureDuration = lectureDurationBasedOnContent(content);

	const onSuccess = () => {
		navigate("/creator/dashboard");
	};

	const { mutate, isLoading: publishLoading } = useMutation(
		() => {
			return axios.post(`/publish/${id}`, values);
		},
		{ onSuccess }
	);

	const { mutate: updateLecture, isLoading: updateLoading } = useMutation(
		() => {
			return axios.put(`/lecture/${id}`, values);
		}
	);

	const saveBtnDisabled =
		!!values.requirements.filter((i) => i.value.length >= 80).length ||
		!!values.goals.filter((i) => i.value.length >= 80).length;

	const publishDisabled =
		!!publish.title &&
		!!publish.caption &&
		!!publish.promoVideo &&
		!requirements.filter((i) => i.value.length >= 80).length &&
		!goals.filter((i) => i.value.length >= 80).length &&
		goals.filter((i) => i.value.length > 0).length > 2 &&
		requirements.filter((i) => i.value.length > 0).length > 2 &&
		lectureDuration > 100;

	return (
		<header className="edit-lecture-header">
			<NavLink to="/creator/dashboard" className="back-to-link" replace>
				<i className="pi pi-chevron-left" /> Back to lectures
			</NavLink>
			<div className="flex align-items-center border-left-2 pl-3 gap-2">
				<span className="text-primary font-semibold text-xl">
					{values.publish.title}
				</span>
				{!!formattedVideoDuration(lectureDuration) && (
					<span>
						{formattedVideoDuration(lectureDuration)} of content uploaded
					</span>
				)}
			</div>
			{values.publish.status === "Draft" ? (
				<div>
					<Button
						label="Save changes"
						className="save-button mr-2 bg-transparent text-white"
						type="button"
						icon="pi pi-bookmark"
						iconPos="left"
						onClick={submitForm}
						disabled={saveBtnDisabled}
					/>

					<Button
						label="Publish"
						className="save-button"
						type="button"
						icon="pi pi-globe"
						iconPos="left"
						loading={publishLoading}
						onClick={() => mutate()}
						disabled={!publishDisabled}
					/>
				</div>
			) : (
				<Button
					label="Update"
					className="save-button"
					type="button"
					iconPos="left"
					icon="pi pi-check"
					loading={updateLoading}
					onClick={() => updateLecture()}
					disabled={!publishDisabled}
				/>
			)}
		</header>
	);
};

export default EditLectureHeader;
