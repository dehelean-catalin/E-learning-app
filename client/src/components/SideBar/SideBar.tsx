import { MdOutlineHistory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscHome } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
import { Category } from "../../data/models/createdLecture.model";
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
				to={`home?category=${Category.ALL}`}
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<span>
					<VscHome />
					Home
				</span>
			</NavLink>

			<NavLink
				to={"/creator/created-lectures"}
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<span>
					<RxDashboard /> Dashboard
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
