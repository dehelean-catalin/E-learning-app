import { AccountDataActions } from "../../redux/account/AccountReducer";
import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { getAccountData, updateAccountData } from "../../services/userServices";
import { ActionType } from "typesafe-actions";
import { NotificationActions } from "../../redux/notificationReducer";
export function* setAccountDataSaga({
	payload,
}: ActionType<typeof AccountDataActions.setAccountDataRequest>): SagaIterator {
	try {
		const updateResult = yield call(updateAccountData, payload);
		const result = yield call(getAccountData);
		if (result?.status == 200) {
			yield put(AccountDataActions.getAccountDataSuccess(result.data));
			yield put(
				NotificationActions.showBannerNotification({
					type: "info",
					message: updateResult.data,
				})
			);
		}
	} catch (error) {
		yield put(AccountDataActions.getAccountDataFail());
	}
}
