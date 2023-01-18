import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { AuthActions } from "../../redux/auth/authReducer";
import { forgotPassword } from "../../services/authServices";
export function* forgotPasswordSaga({
	payload,
}: ActionType<typeof AuthActions.forgotPasswordRequest>): SagaIterator {
	try {
		const result = yield call(forgotPassword, payload);
		if (result?.status == 200) {
			yield put(AuthActions.forgotPasswordSuccess());
		}
	} catch (error) {
		yield put(AuthActions.forgotPasswordFail());
	}
}
