import GridCard from "components/Cards/GridCard/GridCard";
import { FC } from "react";
import GridCardIcon from "../../../components/Cards/GridCard/GridCardIcon";
import Divider from "../../../components/Divider/Divider";
import { LectureCard } from "../../../data/models/lectureModel";
import styles from "./HomeSection.module.scss";

type Props = {
	title?: string;
	value: LectureCard[];
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ value, title, showDivider }) => {
	return (
		<div className={styles["home-section"]}>
			<div className={styles["lecture-list"]}>
				{value.map((lecture) => (
					<GridCard
						key={lecture.id}
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
