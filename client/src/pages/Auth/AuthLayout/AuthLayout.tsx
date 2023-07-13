import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../../../data/context/auth-context";
import { Category } from "../../../data/models/creatorModel";

const AuthLayout = () => {
	const { token } = useContext(AuthContext);

	if (token)
		return <Navigate to={`/home?category=${Category.ALL}`} replace={true} />;

	return (
		<div className="Auth">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
