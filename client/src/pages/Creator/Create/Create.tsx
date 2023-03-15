import Button from "common/Button/Button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "./Create.scss";

const Create = () => {
	return (
		<div className="create-page">
			<form>
				<h1>Create your course</h1>
				<span>
					Îi dai un titlu provizoriu? Este ok dacă nu ai inspirație acum pentru
					un titlu bun. Îl poți schimba mai târziu.
				</span>
				<InputText placeholder="Enter title"></InputText>
				<Dropdown options={["test"]} placeholder={"Pick a category"}></Dropdown>
				<InputText placeholder="Chose the panguage" />
				<Button>Finish</Button>
			</form>
		</div>
	);
};

export default Create;
