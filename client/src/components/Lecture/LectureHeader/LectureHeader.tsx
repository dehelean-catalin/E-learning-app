import TreeNode from "primereact/treenode";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getRatingValue } from "../../../utils/lectureCardHelper";
import { useAxios } from "../../../config/axiosInstance";
import { LectureModel } from "../../../data/models/lectureModel";
import AuthContext from "../../../data/context/auth-context";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import styles from "./LectureHeader.module.scss";
import Button from "../../../common/Button/Button";
import { CustomRating } from "../../../common/CustomRating/CustomRating";
type Props = { value: LectureModel };
const LectureHeader: FC<Props> = ({ value }) => {
	const {
		id,
		title,
		thumbnail,
		createdBy,
		category,
		subCategory,
		details,
		language,
		numberOfUsers,
		items,
		reviewList,
	} = value;
	const { userId } = useContext(AuthContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const axiosInstance = useAxios();

	const [page, setPage] = useState("0");
	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${id}/page`)
			.then((res) => setPage(res.data));
	}, []);

	const handleClick = useCallback(() => {
		axiosInstance
			.post(`/user/watching-lectures/${id}`)
			.then(() => navigate(`/lecture/${id}/overview?page=0`))
			.catch((e) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
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
					onClick={() => navigate(`/lecture/${id}/overview?page=${page}`)}
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
						{getLectureDuration(items.data)} of video
					</div>
					<div className={styles.row}>
						<BiBook />
						{items.data.length} chapters
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{details}</div>
				<div>
					Author: <span>{createdBy}</span>, Fields: <span>{category}</span>
					<span>{subCategory}</span>
				</div>
				<div>
					Last update: <span>{getLastUpdateDate(items.data)}</span>
				</div>
				<div>
					Language: <span>{language}</span>
				</div>

				<div className={styles.btns}>
					<CustomRating
						rating={getRatingValue(reviewList.data)}
						numberOfRates={reviewList.data.length}
						numberOfUsers={numberOfUsers.length}
					/>
					{getButton()}
				</div>
			</div>
		</div>
	);
};

export default LectureHeader;

const getLastUpdateDate = (data: TreeNode[]) => {
	let dateArray: string[] = [];
	let maxDate = "";

	data.forEach((i) =>
		i.children.forEach((o) => dateArray.push(o.data.lastUpdate))
	);

	dateArray.forEach((i) => {
		if (i > maxDate) {
			maxDate = i;
		}
	});

	return maxDate;
};

const getLectureDuration = (data: TreeNode[]) => {
	let sum = 0;
	data.forEach((i) =>
		i.children.forEach((o) => {
			sum += o.data.duration;
		})
	);
	const valueInMin = sum / 60;
	if (valueInMin > 60) {
		return Math.ceil(valueInMin / 60) + " h";
	}
	return Math.ceil(sum / 60) + " min";
};
