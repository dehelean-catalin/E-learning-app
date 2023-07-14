import AuthContext from "data/context/auth-context";
import {
	getAuth,
	onAuthStateChanged,
	sendEmailVerification,
} from "firebase/auth";
import Create from "pages/Creator/Create/Create";
import CreatedLectures from "pages/Creator/Dashboard/Dashboard";
import EditLecture from "pages/Creator/EditLecture/EditLecture";
import Search from "pages/Search/Search";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/md-dark-indigo/theme.css";
import { useContext } from "react";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import RootLayout from "./data/routes/RootLayout";
import VerifyEmailLayout from "./data/routes/VerifyEmailLayout";
import {
	CreatedLecturesRoute,
	LECTURE_OVERVIEW_ROUTE,
} from "./data/routes/baseRoutes";
import AuthLayout from "./pages/Auth/AuthLayout/AuthLayout";
import ForgotPassword from "./pages/Auth/ForgotPassoword/ForgotPassword";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import PlanLecture from "./pages/Creator/EditLecture/PlanLecture/PlanLecture";
import PublishLecture from "./pages/Creator/EditLecture/PublishLecture/PublishLecture";
import SettingsLecture from "./pages/Creator/EditLecture/SettingsLecture/SettingsLecture";
import UploadLecture from "./pages/Creator/EditLecture/UploadLecture/UploadLecture";
import EmailVerified from "./pages/EmailVerified/EmailVerified";
import History from "./pages/HistoryPage/History";
import Home from "./pages/Home/Home";
import LectureDetails from "./pages/LectureDetails/LectureDetails";
import LectureOverview from "./pages/LectureOverview/LectureOverview";
import SavedLectures from "./pages/Library/SavedLectures/SavedLectures";
import NotFound from "./pages/NotFound/NotFound";
import Account from "./pages/Settings/Profile/AccountPage";
import Security from "./pages/Settings/Security/Security";
import Settings from "./pages/Settings/Settings";

function App() {
	const { handleEmailVerified, handleProviderId, logout } =
		useContext(AuthContext);

	onAuthStateChanged(getAuth(), (user) => {
		if (!user) return;
		let userSessionTimeout = null;
		const { emailVerified } = user;

		if (user === null && userSessionTimeout) {
			clearTimeout(userSessionTimeout);
			userSessionTimeout = null;
		} else {
			user.getIdTokenResult().then((idTokenResult) => {
				const authTime =
					new Date(idTokenResult.claims.auth_time).getTime() * 1000;
				const sessionDurationInMilliseconds = 3600 * 1000;
				const expirationInMilliseconds =
					sessionDurationInMilliseconds - (Date.now() - authTime);
				userSessionTimeout = setTimeout(
					() => logout(),
					expirationInMilliseconds
				);
			});
		}

		if (!emailVerified) sendEmailVerification(user);

		if (emailVerified || user.providerData[0].providerId !== "password")
			handleEmailVerified();

		handleProviderId(user.providerData[0].providerId);
	});

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/*" element={<AuthLayout />}>
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
						<Route path="change-password" element={<Security />} />
					</Route>

					<Route path="lecture/:id" element={<LectureDetails />}></Route>
					<Route path={LECTURE_OVERVIEW_ROUTE} element={<LectureOverview />} />
					<Route path="library" element={<SavedLectures />} />
					<Route path="history" element={<History />} />
					<Route path="search" element={<Search />} />
					<Route path="create" element={<Create />} />

					<Route path="creator/dashboard" element={<CreatedLectures />} />
					<Route path={CreatedLecturesRoute} element={<EditLecture />}>
						<Route index element={<PlanLecture />} />
						<Route path="plan" element={<PlanLecture />} />
						<Route path="upload" element={<UploadLecture />} />
						<Route path="publish" element={<PublishLecture />} />
						<Route path="settings" element={<SettingsLecture />} />
					</Route>

					<Route path="*" element={<NotFound>Not found</NotFound>} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
