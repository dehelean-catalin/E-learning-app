import { ConfirmDialogProps } from "primereact/confirmdialog";
import { ActionType, Reducer, createAction, getType } from "typesafe-actions";

export const ConfirmDialogActions = {
	show: createAction("show", (payload: ConfirmDialogProps) => payload)(),
	hide: createAction("hide")(),
	deleteSection: createAction("deleteSection", (payload: any) => payload)(),
};

export type ConfirmDialogAction = ActionType<typeof ConfirmDialogActions>;

const INITIAL_STATE: ConfirmDialogProps = { visible: false };

export const confirmDialogReducer: Reducer<
	ConfirmDialogProps,
	ConfirmDialogAction
> = (
	state: ConfirmDialogProps = INITIAL_STATE,
	action: ConfirmDialogAction
) => {
	switch (action.type) {
		case getType(ConfirmDialogActions.show):
			return {
				...state,
				visible: true,
				accept: action.payload.accept,
			};
		case getType(ConfirmDialogActions.hide):
			return {
				...state,
				visible: false,
			};

		default:
			return state;
	}
};
