import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Button } from "primereact/button";
import { useAuthentication } from "../../../hooks/useAuthentication";
import "./LoginProviderSection.scss";

const LoginProviderSection = () => {
	const { loginWithProvider } = useAuthentication();
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();

	return (
		<div className="login-provider-section">
			<Button
				className="google p-0"
				aria-label="Google"
				onClick={() => loginWithProvider(googleProvider)}
			>
				<i className="pi pi-google px-2"></i>
				<span className="m-auto font-semibold">Sign in with Google Google</span>
			</Button>

			<Button
				className="discord p-0"
				aria-label="Discord"
				onClick={() => loginWithProvider(githubProvider)}
			>
				<i className="pi pi-github px-2"></i>
				<span className="m-auto font-semibold">Sign in with GitHub</span>
			</Button>
		</div>
	);
};

export default LoginProviderSection;
