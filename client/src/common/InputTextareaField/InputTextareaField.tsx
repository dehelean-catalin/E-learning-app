import { classNames } from "primereact/utils";
import { FC } from "react";
import styles from "./InputTextareaField.module.scss";

type Props = {
	overlay?: "black" | "gray";
	placeholder?: string;
	value: string;
	label?: string;
	errorMessage?: string;
	hasError?: boolean;
	onChange: (s: string) => void;
	onBlur?: () => void;
};
const InputTextareaField: FC<Props> = ({
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
		<div className={classNames(styles[`input-field`], styles[`${overlay}`])}>
			{label}
			<textarea
				style={hasError ? { color: "#ef5350", borderColor: "#ef5350" } : {}}
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onBlur={() => setTouched()}
				rows={5}
				maxLength={200}
				spellCheck={false}
			/>
			<div className={styles.error}>{hasError ? errorMessage : ""}</div>
		</div>
	);
};

export default InputTextareaField;
