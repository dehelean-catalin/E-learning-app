import { useFormikContext } from "formik";
import { Button } from "primereact/button";
import Divider from "../../../../common/Divider/Divider";
import { CreatedLecturesModel } from "../../../../data/models/creator/createdLectures.model";
import "./EditLectureHeader.scss";

const EditLectureHeader = () => {
	const { submitForm, values } = useFormikContext<CreatedLecturesModel>();
	return (
		<header className="publish-header">
			<div className="flex">
				<i className="pi pi-chevron-left" /> Back to lectures
				<Divider />
			</div>
			<div className="page-number">{values.id}</div>
			<Button
				label="Save"
				className="save-button"
				type="button"
				onClick={submitForm}
			/>
		</header>
	);
};

export default EditLectureHeader;
