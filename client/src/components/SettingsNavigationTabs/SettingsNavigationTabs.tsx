import { useContext } from "react";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import AuthContext from "../../data/context/auth-context";
import styles from "./SettingsNavigationTabs.module.scss";

const SettingsNavigationTabs = () => {
	const { logout } = useContext(AuthContext);
	return (
		<div className={styles["settings-navigation-tabs"]}>
			<header>Settings</header>
			<div>
				<NavLink
					to={"account"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<MdOutlineAccountCircle fontSize="24px" /> Account
				</NavLink>
				<NavLink
					to={"saved-lectures"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<BsBookmark fontSize="20px" /> Saved Lectures
				</NavLink>
				<NavLink to={"/join"} onClick={() => logout()}>
					<VscSignOut fontSize="24px" /> Log out
				</NavLink>
			</div>
		</div>
	);
};

export default SettingsNavigationTabs;
