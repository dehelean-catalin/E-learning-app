import AuthContext from "data/context/auth-context";
import {
	getAuth,
	onAuthStateChanged,
	sendEmailVerification,
} from "firebase/auth";
import EmailVerified from "pages/EmailVerified/EmailVerified";
import Search from "pages/Search/Search";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useContext } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Account from "./pages/AccountPage/AccountPage";
import ForgotPassword from "./pages/ForgotPassoword/ForgotPassword";
import History from "./pages/HistoryPage/History";
import Home from "./pages/Home/Home";
import Lecture from "./pages/Lecture/Lecture";
import LectureOverview from "./pages/LectureOverview/LectureOverview";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import SavedLectures from "./pages/SavedLecturesPage/SavedLectures";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import Settings from "./pages/SettingsPage/Settings";
import LoginLayout from "./routes/ProtectedRoutes/LoginLayout";
import RootLayout from "./routes/ProtectedRoutes/RootLayout";
import VerifyEmailLayout from "./routes/ProtectedRoutes/VerifyEmailLayout";

function App() {
	const { handleEmailVerified } = useContext(AuthContext);
	onAuthStateChanged(getAuth(), (user) => {
		const storedEmailVerified = localStorage.getItem("emailVerified");
		if (!user?.emailVerified) {
			sendEmailVerification(user);
		}
		if (user.emailVerified && !storedEmailVerified) {
			handleEmailVerified();
		}
	});
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/*" element={<LoginLayout />}>
					<Route index element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
				</Route>
				<Route path="/email-verified" element={<VerifyEmailLayout />}>
					<Route index element={<EmailVerified />} />
				</Route>
				<Route path="/*" element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="settings/" element={<Settings />}>
						<Route index element={<Account />} />
						<Route path="account" element={<Account />} />
						<Route path="saved-lectures" element={<SavedLectures />} />
						<Route path="change-password" element={<SecurityPage />} />
					</Route>
					<Route path="lecture/:id" element={<Lecture />}></Route>
					<Route path="lecture/:id/overview" element={<LectureOverview />} />
					<Route path="history" element={<History />} />
					<Route path="search" element={<Search />} />
					<Route path="*" element={<NotFound>Not found</NotFound>} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
