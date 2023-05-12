import { Dialog, DialogProps } from "primereact/dialog";
import { FC } from "react";
import "./PRDialog.scss";

const PRDialog: FC<DialogProps> = ({ children, ...rest }) => {
	return (
		<Dialog
			resizable={false}
			draggable={false}
			className="pr-dialog"
			maskClassName="dialog-mask"
			{...rest}
		>
			{children}
		</Dialog>
	);
};

export default PRDialog;
