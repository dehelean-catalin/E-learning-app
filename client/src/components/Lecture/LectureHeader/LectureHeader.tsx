import TreeNode from "primereact/treenode";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../../common/Button/Button";
import { CustomRating } from "../../../common/CustomRating/CustomRating";
import { useAxios } from "../../../config/axiosInstance";
import AuthContext from "../../../data/context/auth-context";
import { LectureModel } from "../../../data/models/lectureModel";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { getRatingValue } from "../../../helper/lectureCardHelper";
import styles from "./LectureHeader.module.scss";
type Props = { value: LectureModel };
const LectureHeader: FC<Props> = ({ value }) => {
	const { userId } = useContext(AuthContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const axiosInstance = useAxios();

	const [page, setPage] = useState("0");

	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${value.id}/page`)
			.then((res) => setPage(res.data));
	}, []);

	const handleClick = useCallback(() => {
		axiosInstance
			.post(`/user/watching-lectures/${value.id}`)
			.then(() => navigate(`/lecture/${value.id}/overview?page=0`))
			.catch((e) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
						message: e.response.data.message,
					})
				)
			);
	}, [axiosInstance, dispatch, navigate, value.id]);

	const getButton = () => {
		if (value.numberOfUsers.includes(userId)) {
			return (
				<Button
					disabled={false}
					onClick={() => navigate(`/lecture/${value.id}/overview?page=${page}`)}
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
				<img src={value.thumbnail} alt="not found" />
				<div className={styles.rows}>
					<div className={styles.row}>
						<BsPlayBtn />
						{getLectureDuration(value.items.data)}
					</div>
					<div className={styles.row}>
						<BiBook />
						{value.items.data.length} chapters
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<div className={styles.title}>{value.title}</div>
				<div className={styles.description}>{value.details}</div>
				<div>
					Author: <span>{value.createdBy}</span>, Fields:
					<span>{value.category}</span>
					<span>{value.subCategory}</span>
				</div>
				<div>
					Last update: <span>{getLastUpdateDate(value.items.data)}</span>
				</div>
				<div>
					Language: <span>{value.language}</span>
				</div>

				<div className={styles.btns}>
					<CustomRating
						rating={getRatingValue(value.reviewList.data)}
						numberOfRates={value.reviewList.data.length}
						numberOfUsers={value.numberOfUsers.length}
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

export const getLectureDuration = (data: TreeNode[]) => {
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
