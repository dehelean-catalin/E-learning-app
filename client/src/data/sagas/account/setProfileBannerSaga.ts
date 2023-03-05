import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import {
	getProfileBanner,
	putProfileBanner,
} from "../../services/userServices";

export function* setProfileBannerSaga({
	payload,
}: ActionType<
	typeof AccountDataActions.setProfileBannerRequest
>): SagaIterator {
	yield put(AccountDataActions.setProfileBannerLoading(true));
	try {
		const result = yield call(putProfileBanner, payload);

		if (result?.status == 200) {
			const res = yield call(getProfileBanner);
			yield put(AccountDataActions.setProfileBannerSucces(res.data));
		}
	} catch (error) {
		console.log(error);
	} finally {
		yield put(AccountDataActions.setProfileBannerLoading(false));
	}
}
