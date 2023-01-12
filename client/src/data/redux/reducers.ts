import userDataReducer, { UserDataAction } from "./userDataReducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";
import { combineReducers } from "@reduxjs/toolkit";
import formReducer, { FormAction } from "./formReducer";
import { StateType } from "typesafe-actions";

const reducers = {
	notificationReducer,
	formReducer,
	userDataReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = NotificationAction | FormAction | UserDataAction;
