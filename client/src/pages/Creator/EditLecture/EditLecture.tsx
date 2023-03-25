import "./EditLecture.scss";
import NavMenu from "./NavMenu/NavMenu";
import PlanningLecture from "./PlanningLecture/PlanningLecture";
import PublishLecture from "./PublishLecture/PublishLecture";
import StructureLecture from "./StructureLecture/StructureLecture";

const EditLecture = () => {
	return (
		<div className="edit-lecture">
			<NavMenu />
			<main>
				<PlanningLecture />
				<StructureLecture />
				<PublishLecture />
			</main>
		</div>
	);
};

export default EditLecture;
