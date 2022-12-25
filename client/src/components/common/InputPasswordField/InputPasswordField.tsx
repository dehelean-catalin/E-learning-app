import { Password } from "primereact/password";
import { FC } from "react";
import styles from "./InputPasswordField.module.scss";

type Props = {
	value: string;
	onChange: (s: string) => void;
	onBlur?: () => void;
	errorMessage?: string;
	hasError?: boolean;
};
const InputPasswordField: FC<Props> = ({
	value,
	onChange: setValue,
	onBlur: setTouched,
	errorMessage,
	hasError,
}) => {
	return (
		<div className={styles["input-password-field"]}>
			Password
			<Password
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={"Enter Passowrd"}
				toggleMask
				feedback={false}
				panelStyle={{ boxShadow: "0px" }}
				inputClassName={
					hasError ? `${styles["input-error"]} ${styles.input}` : styles.input
				}
				onBlur={() => setTouched()}
			/>
			<div className={styles.error}>{errorMessage}</div>
		</div>
	);
};

export default InputPasswordField;
