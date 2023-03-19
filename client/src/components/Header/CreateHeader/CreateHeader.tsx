import { NavLink } from "react-router-dom";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./CreateHeader.scss";

const CreateHeader = () => {
	return (
		<div className="create-header">
			<HeaderLogo />
			<div className="page-number">Create a course</div>
			<NavLink
				className="close-create-page"
				to={"/creator/created-lectures"}
				replace={true}
			>
				Close
			</NavLink>
		</div>
	);
};

export default CreateHeader;
