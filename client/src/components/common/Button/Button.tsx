import React, { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	disabled: boolean;
	clickHandler?: () => void;
};
const Button: FC<Props> = ({ children, disabled, clickHandler }) => {
	return (
		<button
			className={styles.button}
			disabled={disabled}
			onClick={() => clickHandler()}
		>
			{children}
		</button>
	);
};

export default Button;
