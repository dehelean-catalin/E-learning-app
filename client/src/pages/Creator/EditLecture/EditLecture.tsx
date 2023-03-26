import { Outlet } from "react-router";
import "./EditLecture.scss";
import NavMenu from "./NavMenu/NavMenu";

const EditLecture = () => {
	return (
		<div className="edit-lecture">
			<NavMenu />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default EditLecture;
