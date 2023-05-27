import { Button, ButtonProps } from "primereact/button";
import { FC } from "react";
import "./PRButton.scss";

const PRButton: FC<ButtonProps> = ({ className, iconPos, ...rest }) => {
	return (
		<Button
			type={rest.type ?? "button"}
			className={`pr-button ${className ?? ""}`}
			iconPos="left"
			{...rest}
		/>
	);
};

export default PRButton;
