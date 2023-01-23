import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { FC } from "react";
import styles from "./InputPasswordField.module.scss";

type Props = {
	overlay?: "white" | "black" | "gray";
	label?: string;
	value: string;
	onChange: (s: string) => void;
	onBlur?: () => void;
	errorMessage?: string;
	hasError?: boolean;
};
const InputPasswordField: FC<Props> = ({
	overlay = "black",
	label = "Password",
	value,
	onChange: setValue,
	onBlur = () => {},
	errorMessage,
	hasError,
}) => {
	return (
		<div
			className={classNames(
				styles[`input-password-field`],
				styles[`${overlay}`]
			)}
		>
			{label}
			<Password
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={"Enter Passowrd"}
				toggleMask={true}
				feedback={false}
				panelStyle={{ boxShadow: "0px" }}
				inputClassName={
					hasError ? `${styles["input-error"]} ${styles.input}` : styles.input
				}
				onBlur={() => onBlur()}
			/>
			<div className={styles.error}>{errorMessage}</div>
		</div>
	);
};

export default InputPasswordField;
