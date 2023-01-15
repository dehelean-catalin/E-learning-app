import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSagas from "../sagas/rootSaga";
export const sagaMiddleware = createSagaMiddleware();
const configStore = () => {
	const _store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
	});
	sagaMiddleware.run(rootSagas);
	return _store;
};

const store = configStore();
export default store;
