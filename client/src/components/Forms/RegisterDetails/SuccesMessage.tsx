import { useDispatch } from "react-redux";
import { FormActions } from "../../../store/redux/formReducer";

const SuccesMessage = () => {
	const dispatch = useDispatch();
	return (
		<div>
			SuccesMessage
			<button onClick={() => dispatch(FormActions.closeFormular())}>
				Finish
			</button>
		</div>
	);
};

export default SuccesMessage;
