import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
	initializeUserData: createAction("initializeUserData")(),
	setUserData: createAction(
		"setUserData",
		(payload: UserDataState) => payload
	)(),
};

export type UserDataAction = ActionType<typeof actions>;
export const UserDataActions = actions;
export type UserDataState = {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	profilePicture: string;
};
export type UserState = {
	data: UserDataState;
};
const INITIAL_STATE: UserState = {
	data: {
		email: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		aboutYou: "",
		profilePicture: "",
	},
};

const userDataReducer: Reducer<UserState, UserDataAction> = (
	state: UserState = INITIAL_STATE,
	action: UserDataAction
) => {
	switch (action.type) {
		case getType(UserDataActions.initializeUserData):
			return {
				...state,
			};

		case getType(UserDataActions.setUserData):
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
};

export default userDataReducer;
