import { ProgressSpinner } from "primereact/progressspinner";
import { FC } from "react";
import LoginProviderSection from "../LoginProviderSection/LoginProviderSection";
import styles from "./AuthForm.module.scss";

type Props = {
	children: JSX.Element | JSX.Element[];
	title: string;
	isLoading: boolean;
	button: JSX.Element;
	onSubmit: (e: React.FormEvent) => void;
};

const AuthForm: FC<Props> = ({
	onSubmit,
	children,
	title,
	button,
	isLoading,
}) => {
	const submitButton = isLoading ? (
		<button>
			<ProgressSpinner className={styles.loading} strokeWidth={"6px"} />
		</button>
	) : (
		button
	);

	return (
		<form className={styles["auth-form"]} onSubmit={onSubmit}>
			<div className={styles.title}>{title}</div>
			{children}
			{submitButton}
			<LoginProviderSection />
		</form>
	);
};

export default AuthForm;
