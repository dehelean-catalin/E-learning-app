import { Outlet } from "react-router";
import { UploadLectureProvider } from "../../../data/context/uploadLecture";
import "./EditLecture.scss";
import NavMenu from "./NavMenu/NavMenu";

const EditLecture = () => {
	return (
		<UploadLectureProvider>
			<div className="edit-lecture">
				<NavMenu />
				<main>
					<Outlet />
				</main>
			</div>
		</UploadLectureProvider>
	);
};

export default EditLecture;
