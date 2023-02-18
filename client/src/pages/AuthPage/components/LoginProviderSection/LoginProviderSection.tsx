import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import ButtonProvider from "../ButtonProvider/ButtonProvider";
import styles from "./LoginProviderSection.module.scss";
const LoginProviderSection = () => {
	const { loginWithProvider } = useAuthentication();
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	return (
		<div className={styles["login-provider-section"]}>
			<div className={styles.or}>
				<span>or</span>
			</div>
			<ButtonProvider
				label="Sign in with Google"
				icon={<FcGoogle size="20px" />}
				onClick={() => loginWithProvider(googleProvider)}
			/>
			<ButtonProvider
				label="Sign in with GitHub"
				icon={<RxGithubLogo size="20px" />}
				onClick={() => loginWithProvider(githubProvider)}
			/>
		</div>
	);
};

export default LoginProviderSection;
