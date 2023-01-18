import { ProgressSpinner } from "primereact/progressspinner";
import { FC } from "react";
import styles from "./Spinner.module.scss";
type Props = {
	strokeWidth?: string;
};
const Spinner: FC<Props> = ({ strokeWidth = "3px" }) => {
	return (
		<ProgressSpinner className={styles.spinner} strokeWidth={strokeWidth} />
	);
};

export default Spinner;
