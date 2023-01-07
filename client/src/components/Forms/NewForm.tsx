import { useSelector } from "react-redux";
import { FormDataState } from "../../data/redux/formReducer";
import { RootState } from "../../data/redux/reducers";
import RegisterDetailsForm from "./RegisterDetails/RegisterDetailsForm";

const NewForm = () => {
	const form = useSelector<RootState, FormDataState>((s) => s.formReducer.form);
	return <>{form?.type === "register" && <RegisterDetailsForm />}</>;
};

export default NewForm;
