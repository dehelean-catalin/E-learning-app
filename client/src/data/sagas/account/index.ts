import { AccountDataActions } from "../../redux/account/AccountReducer";
import { takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { initializeAccountSaga } from "./accountSaga";
import { setProfilePictureSaga } from "./setProfilePictureSaga";

export const acountSagas = () => {
	return [
		takeLatest(
			getType(AccountDataActions.getAccountDataRequest),
			initializeAccountSaga
		),
		takeLatest(
			getType(AccountDataActions.setProfilePictureRequest),
			setProfilePictureSaga
		),
	];
};
