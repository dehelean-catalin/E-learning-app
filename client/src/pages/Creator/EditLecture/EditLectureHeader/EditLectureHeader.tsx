import { CreatedLectureModel } from "data/models/createdLecture.model";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";
import { Button } from "primereact/button";
import { FC } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import {
	convertSecondsToTime,
	lectureDurationBasedOnContent,
} from "../../../../helpers";
import { useAxios } from "../../../../hooks/useAxios";
import "./EditLectureHeader.scss";

type EditLectureHeaderProps = { isLoading: boolean };
const EditLectureHeader: FC<EditLectureHeaderProps> = ({ isLoading }) => {
	const { submitForm, values, initialValues } =
		useFormikContext<CreatedLectureModel>();
	const { id } = useParams();
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isFormDirty = !isEqual(initialValues, values);

	const { publish, requirements, goals, content } = values;

	const lectureDuration = lectureDurationBasedOnContent(content);

	const handlePublishSuccess = () => {
		navigate("/creator/dashboard");
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Published successfully",
			})
		);
	};

	const handleError = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				message: "Something went wrong!",
			})
		);
	};

	const handleUpdateSuccess = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Your changes have been successfully saved",
			})
		);
	};

	const { mutate, isLoading: publishLoading } = useMutation(
		() => {
			return axios.post(`/publish/${id}`, values);
		},
		{ onSuccess: handlePublishSuccess, onError: handleError }
	);

	const { mutate: updateLecture, isLoading: updateLoading } = useMutation(
		() => {
			return axios.put(`/lecture/${id}`, values);
		},
		{ onSuccess: handleUpdateSuccess, onError: handleError }
	);

	const saveBtnDisabled =
		!!values.requirements.filter((i) => i.value.length >= 80).length ||
		!!values.goals.filter((i) => i.value.length >= 80).length ||
		!isFormDirty;

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
				{!!convertSecondsToTime(lectureDuration).length && (
					<span>
						{convertSecondsToTime(lectureDuration)} of content uploaded
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
						loading={isLoading}
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
