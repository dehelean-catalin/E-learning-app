import { BiDotsVerticalRounded } from "react-icons/bi";
import LectureCard from "../../components/common/LectureCard/LectureCard";
import useFetchQuery from "../../hooks/useFetchQuery";
import { useAxios } from "../../resources/axiosInstance";
import styles from "./History.module.scss";
const History = () => {
	const axiosInstance = useAxios();
	const { data } = useFetchQuery(
		"history",
		async () => {
			const res = await axiosInstance.get("user/watching-lectures");
			return res.data;
		},
		{
			initialData: [],
			onSuccess: () => console.log("lala"),
			onError: () => console.log("lal"),
		}
	);

	return (
		<div className={styles.history}>
			<div className={styles.title}>
				Recent watched
				{!!data.length &&
					data.map((lecture, key) => (
						<LectureCard
							key={key}
							value={lecture}
							icon={<BiDotsVerticalRounded size="24px" />}
						/>
					))}
			</div>
		</div>
	);
};

export default History;
