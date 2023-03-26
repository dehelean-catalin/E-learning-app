import { AiFillHome } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import CreatorSideBar from "./CreatorSideBar/CreatorSideBar";
import "./SideBar.scss";

const NavigationHeader = () => {
	const { pathname } = useLocation();

	if (pathname === "/create") return <></>;

	if (pathname === "creator/created-lectures") return <CreatorSideBar />;
	if (pathname.includes("creator/created-lectures/")) return <></>;

	return (
		<nav className="side-bar">
			<NavLink
				to="home?category=all"
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<span>
					<AiFillHome />
					Home
				</span>
			</NavLink>

			<NavLink
				to="history"
				className={({ isActive }) => (isActive ? "active" : "")}
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
