import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./App";
import { AuthContextProvider } from "./data/context/auth-context";
import store from "./data/redux/store";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
	<AuthContextProvider>
		<Provider store={store}>
			<QueryClientProvider client={queryClient} contextSharing={true}>
				<App />
			</QueryClientProvider>
		</Provider>
	</AuthContextProvider>
);
