import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router";
import { Form } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
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
import EditLectureHeader from "./EditLectureHeader/EditLectureHeader";
import GenericConfirmDialog from "./GenericConfirmDialog";
import NavMenu from "./NavMenu/NavMenu";

const EditLecture = () => {
	const { id } = useParams();
	const axios = useAxios();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const { data, isLoading, isError } = useFetchData("getCreatedLecture", () =>
		getCreatedLecture(axios, id)
	);

	const handleSuccess = () => {
		queryClient.invalidateQueries("getCreatedLecture");
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Your changes have been successfully saved",
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

	const { mutate, isLoading: isSubmitLoading } = useMutation(
		(v: CreatedLectureModel) => updateCreatedLecturePlan(axios, id, v),
		{
			onSuccess: handleSuccess,
			onError: handleError,
		}
	);

	if (!isLoading) return <Spinner />;

	if (isError) return <NotFoundError />;

	return (
		<>
			<Formik<CreatedLectureModel>
				initialValues={data}
				onSubmit={(v) => mutate(v)}
			>
				{(props) => (
					<Form className="edit-form">
						<EditLectureHeader isLoading={isSubmitLoading} />
						<main>
							<NavMenu />
							<section className="plan-section">
								<Outlet context={props} />
							</section>
						</main>
					</Form>
				)}
			</Formik>
			<GenericConfirmDialog />
		</>
	);
};

export default EditLecture;
