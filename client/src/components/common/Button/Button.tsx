import React, { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	disabled: boolean;
	onClick?: () => void;
	color?: string;
};
const Button: FC<Props> = ({
	children,
	disabled,
	onClick,
	color = "#38c669",
}) => {
	return (
		<button
			className={styles.button}
			disabled={disabled}
			onClick={() => onClick()}
			style={{ background: color }}
		>
			{children}
		</button>
	);
};

export default Button;
