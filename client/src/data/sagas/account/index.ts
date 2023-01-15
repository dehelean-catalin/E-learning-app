import { UserDataActions } from "./../../redux/userDataReducer";
import { takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { initializeUserDaraSaga } from "../userSaga";

export const acountSagas = () => {
	return [
		takeLatest(
			getType(UserDataActions.initializeUserData),
			initializeUserDaraSaga
		),
	];
};
