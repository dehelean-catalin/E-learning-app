import SettingsNavigationTabs from "../../components/SettingsNavigationTabs/SettingsNavigationTabs";
import { Outlet } from "react-router";
import styles from "./Settings.module.scss";

const Settings = () => {
	return (
		<div className={styles.settings}>
			<div className={styles.container}>
				<SettingsNavigationTabs />
				<Outlet />
			</div>
		</div>
	);
};

export default Settings;
