import AccountDataCard from "./AccountDataCard/AccountDataCard";
import styles from "./AccountPage.module.scss";
import AccountSection from "./AccountSection/AccountSection";

const Account = () => {
	return (
		<div className={styles["settings-content"]}>
			<AccountDataCard />
			<AccountSection />
		</div>
	);
};

export default Account;
