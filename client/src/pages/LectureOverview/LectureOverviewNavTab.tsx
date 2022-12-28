import { FC } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { WatchingLectureItem } from "../../resources/models/usersModel";
import styles from "./LectureOverview.module.scss";

type Props = {
	id: string;
	page: string;
	value: WatchingLectureItem;
};
const LectureOverviewNavTab: FC<Props> = ({ value, page, id }) => {
	const navigate = useNavigate();
	return (
		<div
			className={
				value.page === page
					? `${styles.chapter} ${styles.active}`
					: styles.chapter
			}
			onClick={() => navigate(`/lecture/${id}/overview?page=${value.page}`)}
		>
			<div>
				{value.confirmedProgress >= value.duration - 10 ? (
					<MdCheckBox />
				) : (
					<MdCheckBoxOutlineBlank />
				)}
			</div>

			<div className={styles.details}>
				<div>{value.title}</div>
				<div className={styles.time}>
					<RiVideoLine />
					{Math.round(value.duration / 60)} min
				</div>
			</div>
		</div>
	);
};

export default LectureOverviewNavTab;
