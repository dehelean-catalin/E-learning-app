import { Divider } from "primereact/divider";
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
		<div className={styles["auth-form"]}>
			<form onSubmit={onSubmit}>
				<div className={styles.title}>{title}</div>
				{children}
				{button}
			</form>
			<Divider align="center">
				<span className="font-semibold text-color-secondary">Or</span>
			</Divider>
			<LoginProviderSection />
		</div>
	);
};

export default AuthForm;
