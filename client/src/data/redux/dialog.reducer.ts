import { ActionType, Reducer, createAction, getType } from "typesafe-actions";

export const DialogActions = {
	showDialog: createAction(
		"showDialog",
		(payload: { src: string; title: string }) => payload
	)(),
	hideDialog: createAction("hideDialog")(),
};

export type DialogAction = ActionType<typeof DialogActions>;

export type DialogState = {
	visible: boolean;
	src?: string;
	title?: string;
};
const INITIAL_STATE: DialogState = { visible: false };

export const dialogReducer: Reducer<DialogState, DialogAction> = (
	state: DialogState = INITIAL_STATE,
	action: DialogAction
) => {
	switch (action.type) {
		case getType(DialogActions.showDialog):
			return {
				...state,
				visible: true,
				src: action.payload.src,
				title: action.payload.title,
			};
		case getType(DialogActions.hideDialog):
			return {
				...state,
				visible: false,
			};

		default:
			return state;
	}
};
