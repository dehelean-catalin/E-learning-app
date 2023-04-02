import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import accountReducer, { AccountDataAction } from "./account/AccountReducer";
import authReducer from "./auth/authReducer";
import formReducer, { FormAction } from "./formReducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";
import uploadLectureReducer, {
	UploadLectureAction,
} from "./uploadLecture/uploadLectureReducer";

const reducers = {
	notificationReducer,
	formReducer,
	accountReducer,
	authReducer,
	uploadLectureReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction =
	| NotificationAction
	| FormAction
	| AccountDataAction
	| UploadLectureAction;
