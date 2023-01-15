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
import SavedLectures from "./pages/SavedLecturesPage/SavedLectures";
import Account from "./pages/AccountPage/AccountPage";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import History from "./pages/HistoryPage/History";
import Home from "./pages/Home/Home";
import LoginLayout from "./routes/ProtectedRoutes/LoginLayout";
import RootLayout from "./routes/ProtectedRoutes/RootLayout";
import Lecture from "./pages/Lecture/Lecture";
import LectureOverview from "./pages/LectureOverview/LectureOverview";
import NotFound from "./pages/NotFound/NotFound";
import Settings from "./pages/SettingsPage/Settings";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/*" element={<LoginLayout />}>
					<Route index element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/*" element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="settings/" element={<Settings />}>
						<Route index element={<Account />} />
						<Route path="account" element={<Account />} />
						<Route path="saved-lectures" element={<SavedLectures />} />
					</Route>
					<Route path="lecture/:id" element={<Lecture />}></Route>
					<Route path="lecture/:id/overview" element={<LectureOverview />} />
					<Route path="history" element={<History />} />

					<Route path="*" element={<NotFound />} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
