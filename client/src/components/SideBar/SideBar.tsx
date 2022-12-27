import { AiFillHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { MdHelp } from "react-icons/md";
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
				to="activity"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<span>
					<IoMdNotifications />
					History
				</span>
			</NavLink>

			<NavLink
				to="help"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<span>
					<MdHelp />
					Help
				</span>
			</NavLink>
		</nav>
	);
};

export default NavigationHeader;
