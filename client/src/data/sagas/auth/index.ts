import { takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { AuthActions } from "./../../redux/auth/authReducer";
import { forgotPasswordSaga } from "./forgotPasswordSaga";

export const authSagas = () => {
	return [
		takeLatest(getType(AuthActions.forgotPasswordRequest), forgotPasswordSaga),
	];
};
