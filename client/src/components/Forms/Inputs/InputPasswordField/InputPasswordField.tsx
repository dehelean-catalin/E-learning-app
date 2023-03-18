import classNames from "classnames";
import Divider from "common/Divider/Divider";
import { Password } from "primereact/password";
import { FC } from "react";
import "./InputPasswordField.scss";

type Props = {
	overlay?: "white" | "black" | "gray";
	label?: string;
	value: string;
	onChange: (s: string) => void;
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
	onChange: setValue,
	onBlur = () => {},
	errorMessage,
	feedback = false,
}) => {
	const header = <div className="font-bold mb-3">Pick a password</div>;
	const footer = (
		<>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0 line-height-3">
				<li>At least one lowercase, one uppercase</li>
				<li>At least one numeric, one symbol</li>
				<li>Minimum 8 characters</li>
			</ul>
		</>
	);
	return (
		<div className={classNames(["input-password-field", `${overlay}`])}>
			{label}
			<Password
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={"Enter Passowrd"}
				feedback={feedback}
				toggleMask={true}
				panelStyle={{ boxShadow: "0px" }}
				inputClassName={classNames("input", { "input-error": errorMessage })}
				onBlur={() => onBlur()}
				mediumRegex={mediumRegex}
				strongRegex={strongRegex}
				header={header}
				footer={footer}
			/>
			<div className="error">{errorMessage}</div>
		</div>
	);
};

export default InputPasswordField;
