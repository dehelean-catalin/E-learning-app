import { FC } from "react";
import styles from "./ButtonProvider.module.scss";
type Props = {
	label: string;
	icon: JSX.Element;
	onClick: () => void;
};
const ButtonProvider: FC<Props> = ({ onClick, label, icon }) => {
	return (
		<button
			type="button"
			className={styles["button-provider"]}
			onClick={onClick}
		>
			{icon}
			{label}
		</button>
	);
};

export default ButtonProvider;
