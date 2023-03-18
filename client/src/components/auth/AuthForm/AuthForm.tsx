import { FC } from "react";
import LoginProviderSection from "../LoginProviderSection/LoginProviderSection";
import styles from "./AuthForm.module.scss";

type Props = {
	children: JSX.Element | JSX.Element[];
	title: string;
	button: JSX.Element;
	onSubmit: (e: React.FormEvent) => void;
};

const AuthForm: FC<Props> = ({ onSubmit, children, title, button }) => {
	return (
		<form className={styles["auth-form"]} onSubmit={onSubmit}>
			<div className={styles.title}>{title}</div>
			{children}
			{button}
			<LoginProviderSection />
		</form>
	);
};

export default AuthForm;
