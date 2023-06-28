import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import accountReducer, { AccountDataAction } from "./AccountReducer";
import authReducer from "./auth/authReducer";
import {
	ConfirmDialogAction,
	confirmDialogReducer,
} from "./confirmDialog.reducer";
import uploadLectureReducer, {
	UploadLectureAction,
} from "./creator/uploadLectureReducer";
import { DialogAction, dialogReducer } from "./dialog.reducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";

const reducers = {
	notificationReducer,
	accountReducer,
	authReducer,
	uploadLectureReducer,
	confirmDialogReducer,
	dialogReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction =
	| NotificationAction
	| AccountDataAction
	| UploadLectureAction
	| ConfirmDialogAction
	| DialogAction;
