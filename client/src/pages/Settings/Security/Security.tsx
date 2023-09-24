import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PRButton from "../../../components/PRButton/PRButton";
import Spinner from "../../../components/Spinner/Spinner";
import AuthContext from "../../../data/context/auth-context";
import { useAxios } from "../../../data/hooks/useAxios";
import { useFetchData } from "../../../data/hooks/useFetchData";
import { showConfirmDialog } from "../../../data/redux/dialogReducer";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { RootState } from "../../../data/redux/store";
import ConnectionSection from "./ConnectionsSection/ConnectionsSection";

const Security = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { handleDeleteUser } = useContext(AuthContext);
	const email = useSelector<RootState, string>(
		(s) => s.accountReducer.data.email
	);

	const {
		data: connectinList,
		isError,
		isLoading,
	} = useFetchData("getConnectionList", () =>
		axios.get("connections").then((res) => res.data)
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
			<h3 className="mb-2">Activity log</h3>
			<ConnectionSection value={connectinList} />
			<div className="ml-auto">
				Suspicious activity?
				{localStorage.getItem("providerId") === "password" ? (
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
			<h3 className="my-2">Delete account</h3>
			<div className="flex gap-3 align-items-center">
				<i className="pi pi-exclamation-triangle mr-2 text-2xl" />
				<p>
					This will permanently delete the data related to this course and the
					information will no longer be retrievable.
				</p>
				<PRButton
					className="surface-card text-white"
					style={{ width: "200px" }}
					label="Delete"
					type="button"
					iconPos="left"
					icon="pi pi-trash"
					onClick={() => {
						dispatch(
							showConfirmDialog({
								onConfirm: async () =>
									await axios.delete("/account").then(() => {
										handleDeleteUser();
										navigate("/login", { replace: true });
									}),
							})
						);
					}}
				/>
			</div>
		</div>
	);
};

export default Security;
