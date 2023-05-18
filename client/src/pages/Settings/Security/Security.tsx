import Spinner from "../../../components/Spinner/Spinner";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import ChangeEmailForm from "./ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import ConnectionSection from "./ConnectionsSection/ConnectionsSection";

const Security = () => {
	const axios = useAxios();
	const {
		data: connectinList,
		isError,
		isLoading,
	} = useFetchData("getConnectionList", () =>
		axios.get("connections-list").then((res) => res.data)
	);
	if (isLoading) return <Spinner />;
	return (
		<div className="flex-1 flex flex-column gap-2">
			<h2>Activity log</h2>
			<ConnectionSection value={connectinList} />
			<ChangePasswordForm />
			<ChangeEmailForm />
		</div>
	);
};

export default Security;
