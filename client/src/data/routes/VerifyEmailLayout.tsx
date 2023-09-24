import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/auth-context";

const VerifyEmailLayout: FC = () => {
	const { token, emailVerified } = useContext(AuthContext);

	if (token && emailVerified === "true") return <Navigate to="/home" replace />;
	console.log(token, emailVerified);
	if (!token) return <Navigate to="/login" replace />;

	return (
		<div className="Auth">
			<Outlet />
		</div>
	);
};

export default VerifyEmailLayout;
