import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import accountReducer, { AccountDataAction } from "./account/AccountReducer";
import authReducer from "./auth/authReducer";
import editLectureReducer, {
	EditLectureAction,
} from "./creator/editLectureReducer";
import uploadLectureReducer, {
	UploadLectureAction,
} from "./creator/uploadLectureReducer";
import formReducer, { FormAction } from "./formReducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";

const reducers = {
	notificationReducer,
	formReducer,
	accountReducer,
	authReducer,
	uploadLectureReducer,
	editLectureReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction =
	| NotificationAction
	| FormAction
	| AccountDataAction
	| UploadLectureAction
	| EditLectureAction;
