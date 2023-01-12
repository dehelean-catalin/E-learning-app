import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
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
const INITIAL_STATE: UserDataState = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	address: "",
	aboutYou: "",
	profilePicture: null,
	email: null,
};

const userDataReducer: Reducer<UserDataState, UserDataAction> = (
	state: UserDataState = INITIAL_STATE,
	action: UserDataAction
) => {
	switch (action.type) {
		case getType(UserDataActions.setUserData):
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

export default userDataReducer;
