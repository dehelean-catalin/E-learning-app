import { CreatedLectureModel } from "data/models/createdLecture.model";
import { useFormikContext } from "formik";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { useAxios } from "../../../../hooks/useAxios";
import "./EditLectureHeader.scss";

const EditLectureHeader = () => {
	const { submitForm, values } = useFormikContext<CreatedLectureModel>();
	const { id } = useParams();
	const axios = useAxios();
	const { mutate } = useMutation(() => {
		return axios.post(`/publish/${id}`, values);
	});

	return (
		<header className="edit-lecture-header">
			<NavLink to="/creator/created-lectures" className="back-to-link" replace>
				<i className="pi pi-chevron-left" /> Back to lectures
			</NavLink>
			<div className="page-number">{values.publish.title}</div>
			<Button
				label="Save"
				className="save-button"
				type="button"
				onClick={submitForm}
				disabled={
					!!values.requirements.filter((i) => i.value.length >= 80).length ||
					!!values.goals.filter((i) => i.value.length >= 80).length
				}
			/>
			{/* <Button
				label="Publish"
				className="save-button"
				type="button"
				onClick={() => mutate()}
				disabled={
					!!values.requirements.filter((i) => i.value.length >= 80).length
				}
			/> */}
		</header>
	);
};

export default EditLectureHeader;
