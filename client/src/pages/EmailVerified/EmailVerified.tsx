import InfoBoxEmail from "components/InfoBoxEmail/InfoBoxEmail";
import { RootState } from "data/redux/reducers";
import { useSelector } from "react-redux";

const EmailVerified = () => {
	const email = useSelector<RootState, string>(
		(s) => s.accountReducer.data.email
	);
	return (
		<div className="flex-1 flex align-items-center justify-content-center mr-2">
			<InfoBoxEmail link="connection link" email={email} />
		</div>
	);
};

export default EmailVerified;
