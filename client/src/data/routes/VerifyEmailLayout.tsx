import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/auth-context";

const VerifyEmailLayout: FC = () => {
	const { token } = useContext(AuthContext);

	if (token && localStorage.getItem("email_verified") === "true")
		return <Navigate to="/home" replace />;
	if (!token) return <Navigate to="/login" replace />;

	return (
		<div className="Auth">
			<Outlet />
		</div>
	);
};

export default VerifyEmailLayout;
