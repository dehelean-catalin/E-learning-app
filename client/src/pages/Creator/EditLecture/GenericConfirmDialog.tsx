import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialogActions } from "../../../data/redux/confirmDialog.reducer";
import { RootState } from "../../../data/redux/reducers";

const GenericConfirmDialog: FC<ConfirmDialogProps> = () => {
	const { visible, accept } = useSelector<RootState, ConfirmDialogProps>(
		(s) => s.confirmDialogReducer
	);

	const dispatch = useDispatch();

	return (
		<ConfirmDialog
			visible={visible}
			onHide={() => dispatch(ConfirmDialogActions.hide())}
			message="Are you sure you want to finish your action?"
			header="Confirmation"
			icon="pi pi-exclamation-triangle"
			accept={accept}
			draggable={false}
			resizable={false}
			reject={() => dispatch(ConfirmDialogActions.hide())}
		/>
	);
};

export default GenericConfirmDialog;
