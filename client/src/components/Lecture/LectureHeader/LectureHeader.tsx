import { FC, useCallback, useContext } from "react";
import { BiBook, BiDotsVerticalRounded } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LectureModel } from "../../../resources/models/lectureModel";
import { BannerNotificationType } from "../../../resources/models/usersModel";
import { useAxios } from "../../../resources/axiosInstance";
import { NotificationActions } from "../../../store/redux/notificationReducer";
import Button from "../../common/Button/Button";
import { CustomRating } from "../../common/CustomRating/CustomRating";
import styles from "./LectureHeader.module.scss";
import AuthContext from "../../../store/context/auth-context";
import { AiFillPlayCircle, AiOutlinePlayCircle } from "react-icons/ai";
type Props = { value: LectureModel };
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
		lastUpdate,
	} = value;
	const { userId } = useContext(AuthContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let a = value.items.find((i) => i.courseContent);
	let b = a.courseContent.map((i) => i.children);
	let sum = 0;

	for (const key in b) {
		let c = b[key];

		for (const yey in c) {
			sum += Math.ceil(c[yey].data.duration);
		}
	}
	const axiosInstance = useAxios();
	const handleClick = useCallback(() => {
		axiosInstance
			.post(`/user/watching-lectures/${id}`)
			.then(() => navigate(`/lecture/${id}/overview?page=0`))
			.catch((e) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: e.response.data.message,
					})
				)
			);
	}, [axiosInstance, dispatch, id, navigate]);
	const getButton = () => {
		if (numberOfUsers.includes(userId)) {
			return (
				<Button
					disabled={false}
					onClick={() => navigate(`/lecture/${id}/overview?page=0`)}
				>
					<AiFillPlayCircle size="18px" />
					Continue
				</Button>
			);
		}
		return (
			<Button disabled={false} onClick={handleClick}>
				Start now
			</Button>
		);
	};
	return (
		<div className={styles["lecture-header"]}>
			<div className={styles.left}>
				<img src={thumbnail} alt="not found" />
				<div className={styles.rows}>
					<div className={styles.row}>
						<BsPlayBtn />
						{Math.ceil(sum / 60)} min of video
					</div>
					<div className={styles.row}>
						<BiBook />
						{a.courseContent.length} chapters
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
				<div>
					Author: <span>{createdBy}</span>, Fields: <span>{category}</span>
					<span>{subCategory}</span>
				</div>
				<div>
					Last update: <span>{lastUpdate}</span>
				</div>
				<div>
					Language: <span>{language}</span>
				</div>

				<div className={styles.btns}>
					<CustomRating
						rating={rating}
						numberOfRates={numberOfRates}
						numberOfUsers={numberOfUsers.length}
					/>
					{getButton()}
				</div>
			</div>
		</div>
	);
};

export default LectureHeader;
