import { useSelector } from "react-redux";
import { AccountState } from "../../../data/redux/AccountReducer";
import { RootState } from "../../../data/redux/reducers";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";
import AccountDataCard from "./AccountDataCard/AccountDataCard";
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
			<AccountDataCard />
			<AccountSection />
		</div>
	);
};

export default Account;
