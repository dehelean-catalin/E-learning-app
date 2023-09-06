import { MdOutlineBookmarks, MdOutlineHistory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscHome } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
import { Category } from "../../data/models/creatorModel";
import "./SideBar.scss";

const NavigationHeader = () => {
	const { pathname } = useLocation();

	if (pathname === "/create") return <></>;

	if (pathname.includes("creator/created-lectures/")) return <></>;

	return (
		<nav className="side-bar">
			<NavLink
				to={`home?category=${Category.ALL}`}
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<VscHome />
				<span>Home</span>
			</NavLink>

			<NavLink
				to={"/creator/dashboard"}
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<RxDashboard size="32px" />
				<span>Dashboard</span>
			</NavLink>

			<NavLink
				to="history"
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<MdOutlineHistory />
				<span>History</span>
			</NavLink>
			<NavLink
				to={"library"}
				className={(navData) => (navData.isActive ? "active" : "")}
			>
				<MdOutlineBookmarks />
				<span>Library</span>
			</NavLink>
		</nav>
	);
};

export default NavigationHeader;
