import { AiFillHome } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.scss";

const NavigationHeader = () => {
	return (
		<nav className={styles["navigation-header"]}>
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
