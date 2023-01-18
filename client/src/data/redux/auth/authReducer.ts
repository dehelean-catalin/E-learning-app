import { ActionType, createAction, getType, Reducer } from "typesafe-actions";

const actions = {
	setInputValue: createAction("setInputValue", (payload: string) => payload)(),
	forgotPasswordRequest: createAction(
		"forgotPasswordRequest",
		(payload: string) => payload
	)(),
	forgotPasswordSuccess: createAction("forgotPasswordSuccess")(),
	forgotPasswordFail: createAction("forgotPasswordFail")(),
	clearState: createAction("clearState")(),
};

export type AuthAction = ActionType<typeof actions>;
export const AuthActions = actions;

export type AuthState = Readonly<{
	value: string;
	hasError: boolean;
	isValid: boolean;
}>;

const INITIAL_STATE: AuthState = {
	value: "",
	hasError: false,
	isValid: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (
	state: AuthState = INITIAL_STATE,
	action: AuthAction
) => {
	switch (action.type) {
		case getType(AuthActions.setInputValue): {
			return {
				...state,
				value: action.payload,
				hasError: false,
			};
		}
		case getType(AuthActions.forgotPasswordRequest):
			return {
				...state,
			};
		case getType(AuthActions.forgotPasswordSuccess):
			return {
				...state,

				isValid: true,
			};
		case getType(AuthActions.forgotPasswordFail):
			return {
				...state,
				hasError: true,
				isValid: false,
			};
		case getType(AuthActions.clearState):
			return {
				value: "",
				hasError: false,
				isValid: false,
			};
		default:
			return state;
	}
};
export default authReducer;
