import { FC, useContext } from "react";
import { BiBook, BiDotsVerticalRounded } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { useNavigate } from "react-router";
import { ILecture } from "../../../resources/models/lectures";
import { Axios } from "../../../resources/routes";
import AuthContext from "../../../store/context/auth-context";
import Button from "../../common/Button/Button";
import { CustomRating } from "../../common/CustomRating/CustomRating";
import styles from "./LectureHeader.module.scss";
type Props = { value: ILecture };
const LectureHeader: FC<Props> = ({ value }) => {
	const {
		id,
		title,
		thumbnail,
		createdBy,
		numberOfRates,
		category,
		subCategory,
		description,
		rating,
		language,
		numberOfUsers,
		numberOfChapters,
		totalHours,
		lastUpdate,
	} = value;
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);

	return (
		<div className={styles["lecture-header"]}>
			<div className={styles.left}>
				<img src={thumbnail} alt="not found" />
				<div className={styles.rows}>
					<div className={styles.row}>
						<BsPlayBtn />
						{totalHours}h of video
					</div>
					<div className={styles.row}>
						<BiBook />
						{numberOfChapters} chapters
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<div className={styles.title}>
					<div>{title}</div> <BiDotsVerticalRounded />
				</div>
				<div className={styles.description}>{description}</div>
				<div className={styles.author}>
					Author: <span>{createdBy}</span>, Fields: <span>{category}</span>
					<span>{subCategory}</span>
				</div>
				<div className={styles.lastUpdate}>
					Last update: <span>{lastUpdate}</span>
				</div>
				<div className={styles.lastUpdate}>
					Language: <span>{language}</span>
				</div>

				<div className={styles.btns}>
					<CustomRating
						rating={rating}
						numberOfRates={numberOfRates}
						numberOfUsers={numberOfUsers}
					/>
					<Button
						disabled={false}
						clickHandler={() => {
							Axios.put(
								"/watching-lectures",
								{
									watchingLectures: { id: "lala", chapter: 1, progress: 120 },
								},
								{
									headers: {
										authorization: "Bearer " + token,
									},
								}
							);
							navigate(`/lecture/${id}/overview?page=0`);
						}}
					>
						Start now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LectureHeader;
