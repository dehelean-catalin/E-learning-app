import { Button, ButtonProps } from "primereact/button";
import { classNames } from "primereact/utils";
import { FC } from "react";
import "./SubmitButton.scss";

export const SubmitButton: FC<ButtonProps> = ({
	className,
	disabled,
	label,
	loading,
}) => {
	return (
		<Button
			className={classNames(["submit-button", className])}
			disabled={disabled}
			label={label}
			loading={loading}
		/>
	);
};
