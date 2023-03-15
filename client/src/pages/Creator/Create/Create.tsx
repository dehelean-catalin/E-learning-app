import Button from "common/Button/Button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const Create = () => {
	return (
		<div>
			<form>
				<InputText placeholder="Enter title"></InputText>
			</form>
			<Dropdown options={["test"]} placeholder={"Pick a category"}></Dropdown>
			<InputText placeholder="Chose the panguage" />
			<div>
				<Button>Back</Button>
				<Button>Next</Button>
			</div>
		</div>
	);
};

export default Create;
