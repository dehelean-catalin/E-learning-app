import { Field } from "formik";
import { FileUpload } from "primereact/fileupload";

const PublishLecture = () => {
	return (
		<div>
			Publica Cursul
			<Field name={`publish.title`} placeholder="title" />
			<Field name={`publish.description`} placeholder="description" />
			<Field as="select" name="publish.category">
				<option value="red">Red</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
			</Field>
			<Field as="select" name="publish.language">
				<option value="red">Red</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
			</Field>
			<Field as="select" name="publish.level">
				<option value="red">Red</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
			</Field>
			<Field name="publish.tags" />
			Imaginea cursului
			<Field type="upload" mode="basic" />
			Videoclip de prezentare
			<FileUpload mode="basic" />
		</div>
	);
};

export default PublishLecture;
