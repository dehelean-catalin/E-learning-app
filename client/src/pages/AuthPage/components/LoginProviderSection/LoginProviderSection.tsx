import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import ButtonProvider from "../ButtonProvider/ButtonProvider";
import styles from "./LoginProviderSection.module.scss";
const LoginProviderSection = () => {
	const { handleLoginWithGoogle, handleLoginWithGitHub } = useAuthentication();
	return (
		<div className={styles["login-provider-section"]}>
			<div className={styles.or}>
				<span>or</span>
			</div>
			<ButtonProvider
				label="Sign in with Google"
				icon={<FcGoogle size="20px" />}
				onClick={handleLoginWithGoogle}
			/>
			<ButtonProvider
				label="Sign in with GitHub"
				icon={<RxGithubLogo size="20px" />}
				onClick={handleLoginWithGitHub}
			/>
		</div>
	);
};

export default LoginProviderSection;
