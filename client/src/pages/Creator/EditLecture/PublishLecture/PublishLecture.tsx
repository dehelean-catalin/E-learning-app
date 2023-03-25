import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import InputTextField from "../../../../components/Forms/Inputs/InputTextField/InputTextField";

const PublishLecture = () => {
	return (
		<div>
			Publica Cursul
			<InputTextField placeholder="title" />
			<InputTextField placeholder="description" />
			<Dropdown placeholder="category" />
			<Dropdown placeholder="lang" />
			<Dropdown placeholder="nivel" />
			<Dropdown placeholder="tags" />
			Imaginea cursului
			<FileUpload mode="basic" />
			Videoclip de prezentare
			<FileUpload mode="basic" />
		</div>
	);
};

export default PublishLecture;
