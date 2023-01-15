import { UserDataActions } from "./../redux/userDataReducer";
import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { getUserData } from "./../services/userServices";
export function* initializeUserDaraSaga(): SagaIterator {
	try {
		const result = yield call(getUserData);
		if (result?.status == 200) {
			yield put(UserDataActions.setUserData(result.data));
		}
	} catch (error) {
		console.log(error);
	}
}
