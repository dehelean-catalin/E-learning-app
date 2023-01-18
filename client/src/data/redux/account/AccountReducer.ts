import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
	getAccountDataRequest: createAction("getAccountDataRequest")(),
	getAccountDataSuccess: createAction(
		"getAccountDataSuccess",
		(payload: AccountDataState) => payload
	)(),
	setProfilePictureRequest: createAction(
		"setProfilePictureRequest",
		(payload: FormData) => payload
	)(),
	setProfilePictureSucces: createAction(
		"setProfilePictureSucces",
		(payload: string) => payload
	)(),
	setLoading: createAction("setLoading", (payload: boolean) => payload)(),
};

export type AccountDataAction = ActionType<typeof actions>;
export const AccountDataActions = actions;
export type AccountDataState = {
	email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: string;
	aboutYou?: string;
	profilePicture: string;
	bannerPicture: string;
};
export type AccountState = {
	data: AccountDataState;
	loading: boolean;
};
const INITIAL_STATE: AccountState = {
	data: {
		email: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		aboutYou: "",
		profilePicture: "",
		bannerPicture: "",
	},
	loading: false,
};

const accountDataReducer: Reducer<AccountState, AccountDataAction> = (
	state: AccountState = INITIAL_STATE,
	action: AccountDataAction
) => {
	switch (action.type) {
		case getType(AccountDataActions.getAccountDataRequest):
			return {
				...state,
			};

		case getType(AccountDataActions.getAccountDataSuccess):
			return {
				...state,
				data: action.payload,
			};
		case getType(AccountDataActions.setProfilePictureRequest):
			return {
				...state,
				loading: true,
			};
		case getType(AccountDataActions.setProfilePictureSucces):
			return {
				...state,
				data: {
					...state.data,
					profilePicture: action.payload,
				},
			};
		case getType(AccountDataActions.setLoading):
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};

export default accountDataReducer;
