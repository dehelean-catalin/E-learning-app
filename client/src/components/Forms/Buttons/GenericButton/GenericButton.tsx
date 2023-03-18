import React, { FC } from "react";
import "./GenericButton.scss";

//TODO: Replace with pr comp

type Props = {
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};
export const GenericButton: FC<Props> = ({
	children,
	disabled,
	className,
	onClick = () => {},
}) => {
	return (
		<button
			className={`generic-button ${className ? className : ""}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
