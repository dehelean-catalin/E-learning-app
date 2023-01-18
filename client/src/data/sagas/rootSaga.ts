import { authSagas } from "./auth/index";
import { all } from "redux-saga/effects";
import { acountSagas } from "./account";
export default function* rootSagas() {
	yield all([...acountSagas(), ...authSagas()]);
}
