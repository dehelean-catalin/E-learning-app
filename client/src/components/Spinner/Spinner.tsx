import { ProgressSpinner } from "primereact/progressspinner";
import { FC } from "react";
import styles from "./Spinner.module.scss";
type Props = {
	className?: string;
};
const Spinner: FC<Props> = ({ className }) => {
	return (
		<ProgressSpinner
			className={`${styles.spinner} ${className ? className : ""} flex h-full`}
			strokeWidth="4px"
		/>
	);
};

export default Spinner;
