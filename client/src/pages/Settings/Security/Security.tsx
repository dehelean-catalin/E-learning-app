import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { RootState } from "../../../data/redux/reducers";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import ConnectionSection from "./ConnectionsSection/ConnectionsSection";

const Security = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const email = useSelector<RootState, string>(
		(s) => s.accountReducer.data.email
	);

	const {
		data: connectinList,
		isError,
		isLoading,
	} = useFetchData("getConnectionList", () =>
		axios.get("connections-list").then((res) => res.data)
	);

	const handleChangePassword = () => {
		axios
			.post("http://localhost:4000/forgot-password", { email })
			.then(() =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: "info",
						message: "A reset password link has been send to your email",
					})
				)
			)
			.catch((err) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
						message: "Something went wrong",
					})
				)
			);
	};

	if (isLoading) return <Spinner />;
	if (isError) return <>Error...</>;

	return (
		<div className="flex-1 flex flex-column gap-2">
			<h2>Activity log</h2>
			<ConnectionSection value={connectinList} />
			<div className="flex align-items-end bg-primary justify-content-right">
				Suspicious activity?
				{localStorage.getItem("providerId") !== "password" ? (
					<span
						className="ml-2 text-primary underline cursor-pointer"
						onClick={handleChangePassword}
					>
						Change password
					</span>
				) : (
					<span className="ml-2">
						Check your {localStorage.getItem("providerId")} account password
					</span>
				)}
			</div>
		</div>
	);
};

export default Security;
