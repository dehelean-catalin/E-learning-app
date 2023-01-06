import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";
import { UserDataModel } from "../models/usersModel";

const actions = {
	setAppInitData: createAction(
		"getInitData",
		(payload: UserDataModel) => payload
	)(),
};

export type AppInitAction = ActionType<typeof actions>;
export const AppInitializationActions = actions;

const INITIAL_STATE: UserDataModel = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	address: "",
	aboutYou: "",
	profilePicture: null,
	email: null,
};

const appInitializationReducer: Reducer<UserDataModel, AppInitAction> = (
	state: UserDataModel = INITIAL_STATE,
	action: AppInitAction
) => {
	switch (action.type) {
		case getType(AppInitializationActions.setAppInitData):
			return {
				...state,
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				address: action.payload.address,
				aboutYou: action.payload.aboutYou,
				profilePicture: action.payload.aboutYou,
			};

		default:
			return state;
	}
};

export default appInitializationReducer;
