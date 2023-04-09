import { Formik } from "formik";
import { Outlet, useParams } from "react-router";
import { Form } from "react-router-dom";
import { CreatedLecturesModel } from "../../../data/models/creator/createdLectures.model";
import { getCreatedLecture } from "../../../data/services/creator";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import "./EditLecture.scss";
import EditLectureHeader from "./EditLectureHeader/EditLectureHeader";
import NavMenu from "./NavMenu/NavMenu";

const EditLecture = () => {
	const { id } = useParams();
	const axios = useAxios();

	const { data, isLoading, isError } = useFetchData("items", () =>
		getCreatedLecture(axios, id)
	);

	if (isLoading) return <>lala</>;
	if (isError) return <>error</>;

	return (
		<Formik<CreatedLecturesModel>
			initialValues={data}
			onSubmit={(v) => console.log(v)}
		>
			{(props) => (
				<Form className="edit-form">
					<EditLectureHeader />
					<main>
						<NavMenu />
						<Outlet />
					</main>
				</Form>
			)}
		</Formik>
	);
};

export default EditLecture;
