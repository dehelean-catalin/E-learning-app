import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ConfirmDialogState,
	hideConfirmDialog,
} from "../../../data/redux/dialogReducer";
import { RootState } from "../../../data/redux/store";

const GenericConfirmDialog: FC<ConfirmDialogProps> = () => {
	const confirmDialog = useSelector<RootState, ConfirmDialogState>(
		(s) => s.dialogReducer.confirmDialog
	);

	const dispatch = useDispatch();

	return (
		<ConfirmDialog
			visible={confirmDialog.isOpen}
			onHide={() => dispatch(hideConfirmDialog())}
			message={
				confirmDialog?.message ?? "Are you sure you want to finish your action?"
			}
			header="Confirmation"
			icon="pi pi-exclamation-triangle"
			accept={confirmDialog?.onConfirm}
			draggable={false}
			resizable={false}
			reject={() => dispatch(hideConfirmDialog())}
		/>
	);
};

export default GenericConfirmDialog;
