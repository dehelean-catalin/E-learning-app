import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers";
export const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
	const _store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
	});
	return _store;
};

const store = configStore();
export default store;
