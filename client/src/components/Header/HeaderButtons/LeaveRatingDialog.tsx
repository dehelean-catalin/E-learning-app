import { Rating } from "primereact/rating";
import PRButton from "../../Forms/Buttons/PRButton/PRButton";
import PRDialog from "../../PRDialog/PRDialog";

const LeaveRatingDialog = ({ visible, onHide }) => {
	return (
		<PRDialog visible={visible} onHide={onHide} header={<h3>Your feedback</h3>}>
			How was your overall experience this course?
			<Rating></Rating>
			<PRButton label="Confim" icon="pi pi-check" />
		</PRDialog>
	);
};

export default LeaveRatingDialog;
