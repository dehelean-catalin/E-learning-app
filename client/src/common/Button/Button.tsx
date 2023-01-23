import React, { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
};
const Button: FC<Props> = ({ children, disabled, onClick = () => {} }) => {
	return (
		<button
			className={styles.button}
			disabled={disabled}
			onClick={() => onClick()}
		>
			{children}
		</button>
	);
};

export default Button;
