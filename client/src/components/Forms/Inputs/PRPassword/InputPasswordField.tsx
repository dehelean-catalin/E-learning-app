import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { ChangeEvent, FC } from "react";
import "./InputPasswordField.scss";
import PRPasswordFooter from "./PRPasswordFooter";

type Props = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	overlay?: "white" | "black" | "gray";
	label?: string;
	onBlur?: () => void;
	errorMessage?: string;
	feedback?: boolean;
};
const mediumRegex =
	'^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[]|\\:;"<>,.?/_₹]).{8,20}$';
const strongRegex =
	'^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[]|\\:;"<>,.?/_₹]).{10,20}$';

const InputPasswordField: FC<Props> = ({
	overlay = "black",
	label = "Password",
	value,
	onChange: handleChange,
	onBlur = () => {},
	errorMessage,
	feedback = false,
}) => {
	const header = <div className="font-bold mb-3">Pick a password</div>;

	return (
		<div className={classNames(["input-password-field", `${overlay}`])}>
			{label}
			<Password
				value={value}
				onChange={handleChange}
				placeholder="Enter Passowrd"
				feedback={feedback}
				toggleMask={true}
				panelStyle={{ boxShadow: "0px" }}
				inputClassName={classNames("input", { "input-error": errorMessage })}
				onBlur={() => onBlur()}
				mediumRegex={mediumRegex}
				strongRegex={strongRegex}
				header={header}
				footer={<PRPasswordFooter value={value} />}
			/>
			<div className="error">{errorMessage}</div>
		</div>
	);
};

export default InputPasswordField;
