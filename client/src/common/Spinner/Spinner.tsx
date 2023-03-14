import { ProgressSpinner } from "primereact/progressspinner";
import { FC } from "react";
import styles from "./Spinner.module.scss";
type Props = {
	className?: string;
	strokeWidth?: string;
};
const Spinner: FC<Props> = ({ strokeWidth = "3px", className }) => {
	return (
		<ProgressSpinner
			className={`${styles.spinner} ${className ? className : ""}`}
			strokeWidth={strokeWidth}
		/>
	);
};

export default Spinner;
