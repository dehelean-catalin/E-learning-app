import { takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import { setAccountDataSaga } from "./setAccountDataSaga";
import { setProfileBannerSaga } from "./setProfileBannerSaga";
import { setProfilePictureSaga } from "./setProfilePictureSaga";

export const acountSagas = () => {
	return [
		takeLatest(
			getType(AccountDataActions.setAccountDataRequest),
			setAccountDataSaga
		),
		takeLatest(
			getType(AccountDataActions.setProfilePictureRequest),
			setProfilePictureSaga
		),
		takeLatest(
			getType(AccountDataActions.setProfileBannerRequest),
			setProfileBannerSaga
		),
	];
};
