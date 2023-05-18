import { all } from "redux-saga/effects";
import { authSagas } from "./auth/index";
export default function* rootSagas() {
	yield all([...authSagas()]);
}
