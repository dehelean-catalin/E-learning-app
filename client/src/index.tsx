import ReactDOM from "react-dom/client";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./App";
import { AuthContextProvider } from "./store/context/auth-context";
import store from "./store/redux/store";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<AuthContextProvider>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</AuthContextProvider>
);
