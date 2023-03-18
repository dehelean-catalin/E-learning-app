import { SubmitButton } from "components/Forms";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "./Create.scss";

const Create = () => {
	return (
		<div className="create-page">
			<form>
				<h1>Create your course</h1>
				<div className="field">
					<h3>Do you give it a provisional title?</h3>
					<span>
						It's okay if you don't have inspiration right now for a good title.
						You can change it later.
					</span>

					<InputText placeholder="ex: Learn React in 60 days ..."></InputText>
				</div>
				<div className="field">
					<h3>Which category best matches the knowledge you will share?</h3>
					<span>
						If you're not sure which category fits best, you can change it
						later.
					</span>
					<Dropdown
						options={["test"]}
						placeholder={"Pick a category"}
					></Dropdown>
				</div>

				<div className="field">
					<h3>In which language will the course content be presented?</h3>
					<InputText placeholder="Chose the panguage" />
				</div>

				<SubmitButton label="Finish" />
			</form>
		</div>
	);
};

export default Create;
