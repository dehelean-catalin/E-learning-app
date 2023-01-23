import styles from "./NotFound.module.scss";
type Props = {
	children: React.ReactNode;
};
const NotFound = ({ children }: Props) => {
	return <div className={styles["not-found"]}>{children}</div>;
};

export default NotFound;
