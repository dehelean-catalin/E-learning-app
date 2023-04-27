import GridCard from "components/Cards/GridCard/GridCard";
import { FC } from "react";
import Divider from "../../../common/Divider/Divider";
import GridCardIcon from "../../../components/Cards/GridCard/GridCardIcon";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import styles from "./HomeSection.module.scss";

type Props = {
	title?: string;
	value: CreatedLectureModel[];
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ value, title, showDivider }) => {
	return (
		<div className={styles["home-section"]}>
			<div className={styles["lecture-list"]}>
				{value.map((lecture, key) => (
					<GridCard
						key={key}
						value={lecture}
						icon={<GridCardIcon id={lecture.id} />}
					/>
				))}
			</div>
			{showDivider && (
				<Divider color="#272727" borderWidth="2px" margin="30px " />
			)}
		</div>
	);
};

export default HomeSection;
