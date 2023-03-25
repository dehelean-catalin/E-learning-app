import { NavLink } from "react-router-dom";
import "./NavMenu.scss";

const NavMenu = () => {
	return (
		<nav className="nav-menu">
			<NavLink to={"planning"}>Planning your lecture</NavLink>
			<NavLink to={"upload"}>Upload your content</NavLink>
			<NavLink to={"publish"}>Publish your lecture</NavLink>
		</nav>
	);
};

export default NavMenu;
