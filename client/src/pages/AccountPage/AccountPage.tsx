import AccountHeaderSection from "./AccountHeaderSection/AccountHeaderSection";
import styles from "./AccountPage.module.scss";
import AccountSection from "./AccountSection/AccountSection";
const Account = () => {
	return (
		<div className={styles["settings-content"]}>
			<AccountHeaderSection />
			<AccountSection />
		</div>
	);
};

export default Account;
