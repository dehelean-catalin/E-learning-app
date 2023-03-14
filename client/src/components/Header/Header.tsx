import InputTextSearch from "common/InputTextSearch/InputTextSearch";
import { FC } from "react";
import "./Header.scss";
import HeaderButtons from "./HeaderButtons";

const Header: FC = () => {
	return (
		<header className={"app-header"}>
			<div className="app-title">
				<div className="triangle"></div>

				<h1>S</h1>
				<h2>marald</h2>
			</div>
			<InputTextSearch />
			<HeaderButtons />
		</header>
	);
};

export default Header;
