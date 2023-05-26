import { MdOutlineHistory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscHome } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
import { Category } from "../../data/models/createdLecture.model";
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
				<span>
					<VscHome />
					Home
				</span>
			</NavLink>

			<NavLink
				to={"/creator/dashboard"}
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<span>
					<RxDashboard size="32px" /> Dashboard
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
			<NavLink
				to={"library"}
				className={(navData) => (navData.isActive ? "active" : "")}
			>
				<span>
					<i className="pi pi-book text-3xl mb-2" /> Library
				</span>
			</NavLink>
		</nav>
	);
};

export default NavigationHeader;
