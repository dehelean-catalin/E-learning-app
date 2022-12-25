import { NavLink } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import styles from "./NavigationHeader.module.scss";
import { AiFillHome } from "react-icons/ai";

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
					Activity
				</span>
			</NavLink>

			<NavLink
				to="/teams/active"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<span>
					<FaUsers />
					Teams
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
