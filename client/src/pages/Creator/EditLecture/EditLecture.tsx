import { Outlet } from "react-router";
import { UploadLectureProvider } from "../../../data/context/uploadLecture";
import "./EditLecture.scss";
import NavMenu from "./NavMenu/NavMenu";

const EditLecture = () => {
	return (
		<div className="edit-lecture">
			<NavMenu />
			<UploadLectureProvider>
				<main>
					<Outlet />
				</main>
			</UploadLectureProvider>
		</div>
	);
};

export default EditLecture;
