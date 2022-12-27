import React from "react";
import { useSelector } from "react-redux";
import { FormState } from "../../store/redux/formReducer";
import { RootState } from "../../store/redux/reducers";
import RegisterDetailsForm from "./RegisterDetails/RegisterDetailsForm";

const NewForm = () => {
	const form = useSelector<RootState, FormState | any>(
		(s) => s.formReducer.form
	);

	// const getForm = () => {
	// 	if (form.type === "register") {
	// 		return <RegisterDetailsForm />;
	// 	}
	// 	return null;
	// };
	return <div>{/* {form && getForm()} */}</div>;
};

export default NewForm;
