import React from "react";
import { useSelector } from "react-redux";
import { FormDataState } from "../../store/redux/formReducer";
import { RootState } from "../../store/redux/reducers";
import RegisterDetailsForm from "./RegisterDetails/RegisterDetailsForm";

const NewForm = () => {
	const form = useSelector<RootState, FormDataState>((s) => s.formReducer.form);
	return <>{form?.type === "register" && <RegisterDetailsForm />}</>;
};

export default NewForm;
