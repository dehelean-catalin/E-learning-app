import { ActionType, Reducer, createAction, getType } from "typesafe-actions";

export const DialogActions = {
	show: createAction(
		"show",
		(payload: { src: string; title: string }) => payload
	)(),
	hide: createAction("hide")(),
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
		case getType(DialogActions.show):
			return {
				...state,
				visible: true,
				src: action.payload.src,
				title: action.payload.title,
			};
		case getType(DialogActions.hide):
			return {
				...state,
				visible: false,
			};

		default:
			return state;
	}
};
