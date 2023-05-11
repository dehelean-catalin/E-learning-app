import { useNavigate } from "react-router";
import "./CreateHeader.scss";

const CreateHeader = () => {
	const navigate = useNavigate();
	return (
		<header className="create-header">
			<h4 onClick={() => navigate(-1)}>
				<i className="pi pi-chevron-left" />
				Go back
			</h4>
			<h2 className="title">Create a course</h2>
		</header>
	);
};

export default CreateHeader;
