import { Dialog, DialogProps } from "primereact/dialog";
import { FC } from "react";

const GenericDialog: FC<DialogProps> = ({ children, ...rest }) => {
	return (
		<Dialog
			draggable={false}
			resizable={false}
			focusOnShow={false}
			dismissableMask
			{...rest}
		>
			{children}
		</Dialog>
	);
};

export default GenericDialog;
