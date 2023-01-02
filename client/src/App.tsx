import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./App.scss";
import SavedLectures from "./components/SettingsComp/SavedLectures";
import Account from "./pages/AccountPage/AccountData";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import History from "./pages/History/History";
import Home from "./pages/Home/Home";
import LoginLayout from "./Layout/LoginLayout";
import RootLayout from "./Layout/RootLayout";
import Lecture from "./pages/Lecture/Lecture";
import LectureOverview from "./pages/LectureOverview/LectureOverview";
import NotFound from "./pages/NotFound/NotFound";
import Settings from "./pages/Settings/Settings";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route element={<LoginLayout />}>
					<Route index path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/*" element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="settings/*" element={<Settings />}>
						<Route index path="account" element={<Account />} />
						<Route index path="saved-lectures" element={<SavedLectures />} />
					</Route>
					<Route path="lecture/:id" element={<Lecture />}></Route>
					<Route
						index
						path="lecture/:id/overview"
						element={<LectureOverview />}
					/>
					<Route index path="history" element={<History />} />

					<Route path="*" element={<NotFound />} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
