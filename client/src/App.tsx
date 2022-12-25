import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import "./App.scss";
import Account from "./pages/AccountPage/AccountData";
import RootLayout from "./pages/Layout/RootLayout";
import Home from "./pages/Home/Home";
import LoginLayout from "./pages/Layout/LoginLayout";
import Lecture from "./pages/Lecture/Lecture";
import LectureOverview from "./pages/LectureOverview/LectureOverview";
import Settings from "./pages/Settings/Settings";
import SavedLectures from "./components/SettingsComp/SavedLectures";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route element={<LoginLayout />}>
					<Route index path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/*" element={<RootLayout />}>
					<Route index path="home" element={<Home />} />
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

					<Route path="*" element={<>not found</>} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
