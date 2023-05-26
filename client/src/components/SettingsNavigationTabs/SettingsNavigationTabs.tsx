import { useContext } from "react";
import { VscSignOut } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import AuthContext from "../../data/context/auth-context";
import styles from "./SettingsNavigationTabs.module.scss";

const SettingsNavigationTabs = () => {
	const { logout } = useContext(AuthContext);

	return (
		<div className={styles["settings-navigation-tabs"]}>
			<div>
				<NavLink
					to={"account"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<i className="pi pi-user mx-2 text-xl" /> Account
				</NavLink>
				<NavLink
					to={"change-password"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<i className="pi pi-lock mx-2 text-xl" /> Security
				</NavLink>
				<NavLink
					to={"settings"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<i className="pi pi-cog mx-2 text-xl" /> Settings
				</NavLink>

				<NavLink to={"/join"} onClick={() => logout()}>
					<VscSignOut fontSize="24px" /> Log out
				</NavLink>
			</div>
		</div>
	);
};

export default SettingsNavigationTabs;
