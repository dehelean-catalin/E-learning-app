import { FC } from "react";
import { IoSadOutline } from "react-icons/io5";
import styles from "./NotFound.module.scss";
type Props = {
	message?: string;
	icon?: JSX.Element;
};
const NotFound: FC<Props> = ({
	message = "Not Found",
	icon = <IoSadOutline />,
}) => {
	return (
		<div className={styles["not-found"]}>
			{icon}
			{message}
		</div>
	);
};

export default NotFound;
