import { AppInitAction } from "./appInitReducer";
import notificationReducer from "./notificationReducer";
import { combineReducers } from "@reduxjs/toolkit";
import appInitializationReducer from "./appInitReducer";
import formReducer, { FormAction } from "./formReducer";
import { StateType } from "typesafe-actions";

const reducers = {
	notificationReducer,
	formReducer,
	appInitializationReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = NotificationAction | FormAction | AppInitAction;
