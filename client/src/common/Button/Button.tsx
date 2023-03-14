import React, { FC } from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};
const Button: FC<Props> = ({
	children,
	disabled,
	className,
	onClick = () => {},
}) => {
	return (
		<button
			className={`${styles.button} ${className ? className : ""}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
