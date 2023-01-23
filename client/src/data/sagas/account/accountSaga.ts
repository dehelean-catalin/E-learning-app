import { AccountDataActions } from "../../redux/account/AccountReducer";
import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { getAccountData } from "../../services/userServices";
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
