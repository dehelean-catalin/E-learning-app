import { useDispatch } from "react-redux";
import { FormActions } from "../../../data/redux/formReducer";

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
