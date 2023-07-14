import { CreatedLectureModel } from "data/models/creatorModel";
import { useFormikContext } from "formik";
import { isEqual } from "lodash";
import { FC, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PRButton from "../../../../components/PRButton/PRButton";
import {
	convertSecondsToTime,
	lectureDurationBasedOnContent,
} from "../../../../data/helpers";
import { useAxios } from "../../../../data/hooks/useAxios";
import { NotificationActions } from "../../../../data/redux/notificationReducer";
import "./EditLectureHeader.scss";

type EditLectureHeaderProps = { isLoading: boolean };

const EditLectureHeader: FC<EditLectureHeaderProps> = ({ isLoading }) => {
	const { submitForm, values, initialValues, setFieldValue } =
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
			return axios.post(`/lecture/${id}`, values);
		},
		{ onSuccess: handlePublishSuccess, onError: handleError }
	);

	const { mutate: updateLecture, isLoading: updateLoading } = useMutation(
		() => {
			return axios.put(`/lecture/${id}`, values);
		},
		{ onSuccess: handleUpdateSuccess, onError: handleError }
	);

	useEffect(() => {
		setFieldValue("duration", lectureDuration);
	}, [lectureDuration, setFieldValue]);

	const saveBtnDisabled = !isFormDirty;

	const publishDisabled =
		!!publish.title &&
		!!publish.description &&
		!!publish.caption &&
		!!publish.promoVideo &&
		!requirements.filter((i) => i.length >= 160).length &&
		!goals.filter((i) => i.length >= 160).length &&
		goals.filter((i) => i.length > 0).length > 2 &&
		requirements.filter((i) => i.length > 0).length > 2 &&
		lectureDuration > 600;

	return (
		<header className="edit-lecture-header">
			<NavLink to="/creator/dashboard" className="back-to-link" replace>
				<i className="pi pi-chevron-left" /> Back to lectures
			</NavLink>
			<div className="center-section">
				<h4 className="title">{values.publish.title}</h4>
				{!!lectureDuration && (
					<div>{convertSecondsToTime(lectureDuration)} of content uploaded</div>
				)}
			</div>

			{values.publish.status === "Draft" ? (
				<div>
					<PRButton
						label="Save changes"
						className="tooltip mr-2"
						icon="pi pi-bookmark"
						onClick={submitForm}
						loading={isLoading}
						disabled={saveBtnDisabled}
					/>

					<PRButton
						label="Publish"
						icon="pi pi-globe"
						className="w-10rem"
						loading={publishLoading}
						onClick={() => mutate()}
						disabled={!publishDisabled}
					/>
				</div>
			) : (
				<PRButton
					label="Update"
					type="button"
					icon="pi pi-check"
					loading={updateLoading}
					onClick={() => updateLecture()}
					disabled={!(publishDisabled && isFormDirty)}
				/>
			)}
		</header>
	);
};

export default EditLectureHeader;
