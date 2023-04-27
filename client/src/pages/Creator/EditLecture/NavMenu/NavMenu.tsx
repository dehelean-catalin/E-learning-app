import { NavLink } from "react-router-dom";
import "./NavMenu.scss";

const NavMenu = () => {
	return (
		<nav className="nav-menu">
			<NavLink
				to="plan"
				className={(navData) =>
					navData.isActive
						? "text-primary border-left-2 border-primary"
						: "border-left-2 border-transparent"
				}
			>
				Plan your lecture
			</NavLink>
			<NavLink
				to="upload"
				className={(navData) =>
					navData.isActive
						? "text-primary border-left-2 border-primary"
						: "border-left-2 border-transparent"
				}
			>
				Upload your content
			</NavLink>
			<NavLink
				to="publish"
				className={(navData) =>
					navData.isActive
						? "text-primary border-left-2 border-primary"
						: "border-left-2 border-transparent"
				}
			>
				Publish your lecture
			</NavLink>
		</nav>
	);
};

export default NavMenu;
