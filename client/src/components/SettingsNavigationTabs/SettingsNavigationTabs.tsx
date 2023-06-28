import { useContext } from "react";
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
					<i className="pi pi-user mx-3 text-xl" /> Account
				</NavLink>
				<NavLink
					to={"change-password"}
					className={(navData) => (navData.isActive ? styles.active : "")}
				>
					<i className="pi pi-lock mx-3 text-xl" /> Security
				</NavLink>

				<NavLink to={"/join"} onClick={() => logout()}>
					<i className="pi pi-sign-out mx-3 text-xl" /> Log out
				</NavLink>
			</div>
		</div>
	);
};

export default SettingsNavigationTabs;
