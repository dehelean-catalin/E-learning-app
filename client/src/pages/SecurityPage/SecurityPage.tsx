import { useEffect, useState } from "react";
import { useAxios } from "../../config/axiosInstance";
import ChangePasswordPage from "./ChangePassword/ChangePassword";
import { ConnectionItem } from "./ConnectionCard/ConnectionCard";
import ConnectionSection from "./ConnectionsSection/ConnectionsSection";
import styles from "./SecurityPage.module.scss";
const SecurityPage = () => {
	const axiosInstance = useAxios();
	const [connectionsList, setConnectionsList] = useState<ConnectionItem[]>([]);

	useEffect(() => {
		axiosInstance.get("/connections-list").then((res) => {
			setConnectionsList(res.data);
		});
	}, []);
	return (
		<div className={styles["security-page"]}>
			<div className={styles.title}>Activity log</div>
			<ConnectionSection value={connectionsList} />
			<ChangePasswordPage />
		</div>
	);
};

export default SecurityPage;
