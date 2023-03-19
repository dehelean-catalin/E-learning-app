import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
	getAccountData: createAction(
		"getAccountData",
		(payload: AccountDataState) => payload
	)(),
	setAccountDataRequest: createAction(
		"setAccountDataRequest",
		(payload: any) => payload
	)(),
	setProfilePictureRequest: createAction(
		"setProfilePictureRequest",
		(payload: FormData) => payload
	)(),
	setProfilePictureSucces: createAction(
		"setProfilePictureSucces",
		(payload: string) => payload
	)(),
	setProfilePictureLoading: createAction(
		"setProfilePictureLoading",
		(payload: boolean) => payload
	)(),
	setProfileBannerRequest: createAction(
		"setProfileBannerRequest",
		(payload: FormData) => payload
	)(),
	setProfileBannerSucces: createAction(
		"setProfileBannerSucces",
		(payload: string) => payload
	)(),
	setProfileBannerLoading: createAction(
		"setProfileBannerLoading",
		(payload: boolean) => payload
	)(),
	setLoading: createAction("setLoading", (payload: boolean) => payload)(),
};

export type AccountDataAction = ActionType<typeof actions>;
export const AccountDataActions = actions;

export type AccountDataState = {
	email?: string;
	displayName?: string;
	phoneNumber?: string;
	address?: string;
	aboutYou?: string;
	profilePicture: string;
	bannerPicture: string;
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
		bannerPicture: "",
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
		case getType(AccountDataActions.getAccountData):
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
		case getType(AccountDataActions.setProfilePictureLoading):
			return {
				...state,
				profileLoading: action.payload,
			};

		case getType(AccountDataActions.setProfileBannerSucces):
			return {
				...state,
				data: {
					...state.data,
					bannerPicture: action.payload,
				},
			};
		case getType(AccountDataActions.setProfileBannerLoading):
			return {
				...state,
				bannerLoading: action.payload,
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
