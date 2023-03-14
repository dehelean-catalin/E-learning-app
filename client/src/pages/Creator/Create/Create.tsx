import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const Create = () => {
	return (
		<div>
			<form>
				<InputText placeholder="Enter title"></InputText>
			</form>
			<Dropdown options={["test"]}></Dropdown>
		</div>
	);
};

export default Create;
