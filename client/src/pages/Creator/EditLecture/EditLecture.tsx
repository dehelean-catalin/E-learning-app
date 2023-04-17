import { Formik } from "formik";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { Form } from "react-router-dom";
import Spinner from "../../../common/Spinner/Spinner";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import {
	getCreatedLecture,
	updateCreatedLecturePlan,
} from "../../../data/services/creator";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";
import "./EditLecture.scss";
import EditLectureHeader from "./components/EditLectureHeader/EditLectureHeader";
import NavMenu from "./components/NavMenu/NavMenu";

const EditLecture = () => {
	const { id } = useParams();
	const axios = useAxios();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data, isLoading, isError } = useFetchData("items", () =>
		getCreatedLecture(axios, id)
	);

	const handleSuccess = () => {
		navigate("/creator/created-lectures");
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Success",
			})
		);
	};

	const handleError = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				message: "Something went wrong",
			})
		);
	};

	const { mutate } = useMutation(
		(v: CreatedLectureModel) => updateCreatedLecturePlan(axios, id, v),
		{
			onSuccess: handleSuccess,
			onError: handleError,
		}
	);

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<Formik<CreatedLectureModel>
			initialValues={data}
			onSubmit={(v) => mutate(v)}
		>
			{(props) => (
				<Form className="edit-form">
					<EditLectureHeader />
					<main>
						<NavMenu />
						<Outlet context={props} />
					</main>
				</Form>
			)}
		</Formik>
	);
};

export default EditLecture;
