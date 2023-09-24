import { useAxios } from "data/hooks/useAxios";
import { useFetchData } from "data/hooks/useFetchData";
import { AccountDataActions } from "data/redux/accountReducer";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { ScrollTop } from "primereact/scrolltop";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Notification from "../../components/Notification/Notification";
import SideBar from "../../components/SideBar/SideBar";
import Spinner from "../../components/Spinner/Spinner";
import GenericConfirmDialog from "../../pages/Creator/EditLecture/GenericConfirmDialog";
import AuthContext from "../context/auth-context";
import { getAccountData } from "../services/userService";

const RootLayout: FC = () => {
	const { token, emailVerified } = useContext(AuthContext);
	const dispatch = useDispatch();
	const axios = useAxios();
	const onSuccess = (e) => dispatch(AccountDataActions.setAccountData(e));

	const { isLoading, isError } = useFetchData(
		["getProfileData", token],
		() => getAccountData(axios),
		{
			onSuccess,
			enabled: !!token,
		}
	);

	if (!token) return <Navigate to="/login" replace />;
	if (emailVerified === "false" || !emailVerified)
		return <Navigate to="/email-verified" replace />;

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<div className="App">
			<SideBar />
			<main className="main-wrapper">
				<Header />
				<div className="app-wrapper">
					<Outlet />
					<ScrollTop
						target="parent"
						threshold={600}
						className="mr-4 bg-primary"
						icon="pi pi-arrow-up text-base"
					/>
				</div>
			</main>
			<Notification />
			<GenericConfirmDialog />
		</div>
	);
};

export default RootLayout;
