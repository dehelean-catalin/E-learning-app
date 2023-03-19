import { AiFillHome } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import CreatorSideBar from "./CreatorSideBar/CreatorSideBar";
import styles from "./SideBar.scss";

const NavigationHeader = () => {
	const { pathname } = useLocation();

	if (pathname === "/create") return <></>;

	if (pathname === "/creator/created-lectures") return <CreatorSideBar />;

	return (
		<nav className="side-bar">
			<NavLink
				to="home?category=all"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<span>
					<AiFillHome />
					Home
				</span>
			</NavLink>

			<NavLink
				to="history"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<span>
					<MdOutlineHistory />
					History
				</span>
			</NavLink>
		</nav>
	);
};

export default NavigationHeader;
