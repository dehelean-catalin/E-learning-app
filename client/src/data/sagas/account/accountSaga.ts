import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { AccountDataActions } from "../../redux/account/AccountReducer";
import { getAccountData } from "../../services/_user.service";
export function* initializeAccountSaga(): SagaIterator {
	try {
		const result = yield call(getAccountData);
		if (result?.status == 200) {
			yield put(AccountDataActions.getAccountDataSuccess(result.data));
		}
	} catch (error) {
		yield put(AccountDataActions.getAccountDataFail());
	}
}
