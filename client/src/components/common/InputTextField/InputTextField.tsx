import { FC } from "react";
import styles from "./InputTextField.module.scss";

type Props = {
	overlay?: "white" | "black";
	placeholder?: string;
	value: string;
	label?: string;
	errorMessage?: string;
	hasError?: boolean;
	onChange: (s: string) => void;
	onBlur?: () => void;
};
const InputTextField: FC<Props> = ({
	overlay = "black",
	value,
	label,
	placeholder,
	onChange: setValue,
	onBlur: setTouched,
	errorMessage,
	hasError,
}) => {
	return (
		<div className={styles[`input-field-${overlay}`]}>
			{label}
			<input
				style={hasError ? { color: "#ef5350", borderColor: "#ef5350" } : {}}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onBlur={() => setTouched()}
			/>
			<div className={styles.error}>{hasError ? errorMessage : ""}</div>
		</div>
	);
};

export default InputTextField;
