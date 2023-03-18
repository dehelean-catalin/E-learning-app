import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import {
	getProfilePicture,
	putProfilePicture,
} from "../../services/_user.service";

export function* setProfilePictureSaga({
	payload,
}: ActionType<
	typeof AccountDataActions.setProfilePictureRequest
>): SagaIterator {
	yield put(AccountDataActions.setProfilePictureLoading(true));
	try {
		const result = yield call(putProfilePicture, payload);

		if (result?.status == 200) {
			const res = yield call(getProfilePicture);
			yield put(AccountDataActions.setProfilePictureSucces(res.data));
		}
	} catch (error) {
		console.log(error);
	} finally {
		yield put(AccountDataActions.setProfilePictureLoading(false));
	}
}
