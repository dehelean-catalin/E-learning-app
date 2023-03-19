import { SagaIterator } from "redux-saga";
import { put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import { NotificationActions } from "../../redux/notificationReducer";

export function* setAccountDataSaga({
	payload,
}: ActionType<typeof AccountDataActions.setAccountDataRequest>): SagaIterator {
	try {
		// const updateResult = yield call(updateAccountData, {
		// 	displayName: payload.displayName,
		// 	phoneNumber: payload.phoneNumber,
		// 	address: payload.address,
		// 	aboutYou: payload.aboutYou,
		// });
		// const result = yield call(getAccountData);
		// if (result?.status == 200) {
		// 	yield put(AccountDataActions.getAccountDataSuccess(result.data));
		// 	yield put(
		// 		NotificationActions.showBannerNotification({
		// 			type: "info",
		// 			message: updateResult.data,
		// 		})
		// 	);
		// }
	} catch (error) {
		yield put(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Try again! Something went wrong",
			})
		);
	}
}
