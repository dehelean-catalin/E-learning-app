import { NavLink } from "react-router-dom";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./CreateHeader.scss";

const CreateHeader = () => {
	return (
		<header className="create-header">
			<HeaderLogo />
			<div className="page-number">Create a course</div>
			<NavLink
				className="close-create-page"
				to={"/creator/created-lectures"}
				replace={true}
			>
				Close
			</NavLink>
		</header>
	);
};

export default CreateHeader;
