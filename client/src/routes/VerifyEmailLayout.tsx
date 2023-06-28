import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../data/context/auth-context";

const VerifyEmailLayout = () => {
	const { emailVerified, token } = useContext(AuthContext);

	if (!token) return <Navigate to="/login" replace={true} />;
	if (emailVerified) return <Navigate to="/home?category=All" replace={true} />;

	return (
		<div className="Auth">
			<Outlet />
		</div>
	);
};

export default VerifyEmailLayout;
