import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./store/context/auth-context";
import { Provider } from "react-redux";
import store from "./store/redux/store";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<AuthContextProvider>
		<Provider store={store}>
			<Suspense fallback={<div>... is loading</div>}>
				<App />
			</Suspense>
		</Provider>
	</AuthContextProvider>
);
