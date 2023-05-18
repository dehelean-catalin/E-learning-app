import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
	setAccountData: createAction(
		"getAccountData",
		(payload: AccountDataState) => payload
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
	email: string;
	displayName: string;
	profilePicture: string;
	phoneNumber?: string;
	address?: string;
	aboutYou?: string;
};

export type AccountState = {
	data: AccountDataState;
	profileLoading: boolean;
	bannerLoading: boolean;
	error: boolean;
};

const INITIAL_STATE: AccountState = {
	data: {
		email: "",
		displayName: "",
		phoneNumber: "",
		address: "",
		aboutYou: "",
		profilePicture: "",
	},
	profileLoading: false,
	bannerLoading: false,
	error: false,
};

const accountDataReducer: Reducer<AccountState, AccountDataAction> = (
	state: AccountState = INITIAL_STATE,
	action: AccountDataAction
) => {
	switch (action.type) {
		case getType(AccountDataActions.setAccountData):
			return {
				...state,
				data: action.payload,
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
