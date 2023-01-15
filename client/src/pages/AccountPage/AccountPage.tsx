import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserDataActions } from "../../data/redux/userDataReducer";
import styles from "./AccountData.module.scss";
import AccountHeaderSection from "./AccountHeaderSection";
import AccountSection from "./AccountSection";
const Account = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(UserDataActions.initializeUserData());
	}, []);

	return (
		<div className={styles["settings-content"]}>
			<header>Account</header>
			<AccountHeaderSection />
			<AccountSection />
		</div>
	);
};

export default Account;
