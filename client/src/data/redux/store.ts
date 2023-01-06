import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const configStore = () => {
	const _store = configureStore({
		reducer: rootReducer,
	});
	return _store;
};

const store = configStore();
export default store;
