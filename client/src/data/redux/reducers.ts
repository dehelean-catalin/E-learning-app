import accountReducer, { AccountDataAction } from "./account/AccountReducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";
import { combineReducers } from "@reduxjs/toolkit";
import formReducer, { FormAction } from "./formReducer";
import { StateType } from "typesafe-actions";
import authReducer from "./auth/authReducer";

const reducers = {
	notificationReducer,
	formReducer,
	accountReducer,
	authReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = NotificationAction | FormAction | AccountDataAction;
