import { InputTextSearch } from "components/Forms";
import { FC } from "react";
import { useLocation } from "react-router";
import CreateHeader from "./CreateHeader/CreateHeader";
import "./Header.scss";
import HeaderButtons from "./HeaderButtons/HeaderButtons";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

const Header: FC = () => {
	const { pathname } = useLocation();

	if (pathname === "/create") {
		return <CreateHeader />;
	}

	return (
		<header className={"app-header"}>
			<HeaderLogo />
			<InputTextSearch />
			<HeaderButtons />
		</header>
	);
};

export default Header;
