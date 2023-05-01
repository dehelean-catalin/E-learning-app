import { Field, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Divider from "../../../../common/Divider/Divider";
import {
	CreatedLectureModel,
	Privacy,
} from "../../../../data/models/createdLecture.model";
import { ConfirmDialogActions } from "../../../../data/redux/confirmDialog.reducer";
import { useAxios } from "../../../../hooks/useAxios";
import "./SettingsLecture.scss";

const SettingsLecture = () => {
	const axios = useAxios();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { values } = useFormikContext<CreatedLectureModel>();

	const handleSuccess = () => {
		navigate("/creator/dashboard", { replace: true });
	};

	const { mutate: deleteLecture, isLoading } = useMutation(
		() => {
			return axios.delete(`/lecture/${values.id}`);
		},
		{ onSuccess: handleSuccess }
	);

	return (
		<>
			<h1 className="mb-2">Settings</h1>
			<Divider />
			{values.publish.status !== "Draft" && (
				<>
					<h3 className="my-2">Enrollment (Privacy)</h3>
					<div className="settings-field">
						<label htmlFor="publish.status">
							Public courses appear in the search results and are available for
							anyone. Private courses can only be accessed via a link and
							unlisted courses cannot be accessed.
						</label>
						<Field as="select" name="publish.status">
							{Object.values(Privacy).map((o) => (
								<option key={o} value={o}>
									{o}
								</option>
							))}
						</Field>
					</div>{" "}
					<Divider />
				</>
			)}

			<h3 className="my-2 text-red-400">
				<i className="pi pi-exclamation-triangle mr-2" />
				Delete lecture
			</h3>
			<div className="settings-field">
				<p>
					This will permanently delete the data related to this course and the
					information will no longer be retrievable.
				</p>
				<Button
					className="bg-red-400 text-white"
					label="Delete"
					type="button"
					iconPos="left"
					icon="pi pi-trash"
					onClick={() => {
						dispatch(ConfirmDialogActions.show({ accept: deleteLecture }));
					}}
					loading={isLoading}
				/>
			</div>
		</>
	);
};

export default SettingsLecture;
