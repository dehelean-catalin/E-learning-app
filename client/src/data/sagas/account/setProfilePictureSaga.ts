import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import {
	postProfilePicture,
	getProfilePicture,
} from "../../services/userServices";

export function* setProfilePictureSaga({
	payload,
}: ActionType<
	typeof AccountDataActions.setProfilePictureRequest
>): SagaIterator {
	try {
		const result = yield call(postProfilePicture, payload);

		if (result?.status == 200) {
			const res = yield call(getProfilePicture);
			yield put(AccountDataActions.setProfilePictureSucces(res.data));
		}
	} catch (error) {
		console.log(error);
	} finally {
		yield put(AccountDataActions.setLoading(false));
	}
}
