import style from "./Steps.module.scss";
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { IoSchoolSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";
import { FC } from "react";
type Props = {
	activeIndex: number;
};
const Steps: FC<Props> = ({ activeIndex }) => {
	const progressValue = () => {
		if (activeIndex === 1) {
			return 38;
		}
		if (activeIndex === 2) {
			return 63;
		}
		if (activeIndex === 3) {
			return 100;
		}
		return 12;
	};
	const userClassname =
		activeIndex < 1
			? `${style.step} ${style.user}`
			: `${style.step} ${style.user} ${style.active} `;
	const educationClassname =
		activeIndex < 2 ? style.step : `${style.step} ${style.active}`;
	const favoriteClassname =
		activeIndex < 3 ? style.step : `${style.step} ${style.active}`;

	return (
		<div className={style["steps-container"]}>
			<ProgressBar
				className={style["progress-bar"]}
				showValue={false}
				color="#268d5d"
				value={progressValue()}
			/>
			<div className={style.steps}>
				<div className={userClassname}>
					<FaUser />
				</div>
				<div className={educationClassname}>
					<IoSchoolSharp />
				</div>
				<div className={favoriteClassname}>
					<MdFavorite />
				</div>
				<div className={favoriteClassname}>
					<HiBadgeCheck />
				</div>
			</div>
		</div>
	);
};

export default Steps;
