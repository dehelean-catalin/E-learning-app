import { useContext, useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiAddCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { BasicLecture } from "../../resources/models/lectures";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import LectureCard from "../common/LectureCard/LectureCard";
import styles from "./SavedLectures.module.scss";

const SavedLectures = () => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const [lectures, setLectures] = useState<BasicLecture[]>([]);

	useEffect(() => {
		Axios.get("/saved-lectures", {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((res) => setLectures(res.data))
			.catch((err) => console.log(err));
	}, [token]);

	const Delete = (id) => {
		Axios.put(
			"/delete-lecture",
			{ id },
			{
				headers: {
					authorization: "Bearer " + token,
				},
			}
		)
			.then(() => {
				Axios.get("/saved-lectures", {
					headers: {
						authorization: "Bearer " + token,
					},
				})
					.then((res) => setLectures(res.data))
					.catch((err) => console.log("err"));
			})
			.catch((err) => console.log(err.response));
	};
	const getLectures = () => {
		if (!lectures.length)
			return (
				<div
					className={styles.empty}
					onClick={() => navigate("/home?category=all")}
				>
					<RiAddCircleLine fontSize="40px" />
					<div>Add new lectures</div>
				</div>
			);

		return lectures?.map((lecture, key) => (
			<LectureCard
				key={key}
				value={lecture}
				className={styles.card}
				bannerClassName={styles.banner}
				contentClassName={styles.content}
				icon={<BiDotsVerticalRounded size="26px" />}
				onRemoveLecture={(id) => Delete(id)}
			/>
		));
	};
	return (
		<div className={styles["saved-lectures"]}>
			<div className={styles.title}>Saved Lectures</div>
			<div className={styles.container}>{getLectures()}</div>
		</div>
	);
};

export default SavedLectures;
