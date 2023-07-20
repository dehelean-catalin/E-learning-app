import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import accountReducer, { AccountDataAction } from "./accountReducer";
import dialogReducer from "./dialogReducer";
import notificationReducer, { NotificationAction } from "./notificationReducer";
import progressReducer, { ProgressAction } from "./progressReducer";

const reducers = {
	notificationReducer,
	accountReducer,
	dialogReducer,
	progressReducer,
};

export const rootReducer = combineReducers(reducers);

export default configureStore({
	reducer: rootReducer,
});

export type RootState = StateType<typeof rootReducer>;
export type RootAction =
	| NotificationAction
	| AccountDataAction
	| ProgressAction;
