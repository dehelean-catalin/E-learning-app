import { useSelector } from "react-redux";
import { AccountState } from "../../data/redux/account/AccountReducer";
import { RootState } from "../../data/redux/reducers";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import AccountHeaderSection from "./AccountHeaderSection/AccountHeaderSection";
import styles from "./AccountPage.module.scss";
import AccountSection from "./AccountSection/AccountSection";
const Account = () => {
	const { error } = useSelector<RootState, AccountState>(
		(s) => s.accountReducer
	);

	if (error) {
		return <NotFoundError />;
	}
	return (
		<div className={styles["settings-content"]}>
			<AccountHeaderSection />
			<AccountSection />
		</div>
	);
};

export default Account;
