import baseImg from "data/images/test.png";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { FC } from "react";
import { useNavigate } from "react-router";
import { CustomRating } from "../../../components/CustomRating/CustomRating";
import { toRelativeTime } from "../../../data/helpers";
import { CreatedLectureModel } from "../../../data/models/creatorModel";
import { itemIcon, itemStatus } from "./item.helper";

const RenderGridItem: FC<{ value: CreatedLectureModel }> = ({ value }) => {
	const navigate = useNavigate();
	const { rating, numberOfRatings, publish, lastUpdate, id, enrolledUsers } =
		value;

	return (
		<div className="p-4 border-1 surface-border border-round">
			<div className="flex flex-wrap align-items-center justify-content-between gap-2">
				<p className="flex align-items-center gap-2 text-color-secondary">
					<i className="pi pi-history"></i>
					<span className="font-semibold">{toRelativeTime(lastUpdate)}</span>
				</p>
				<Tag
					value={publish.status}
					className={itemStatus(publish.status)}
					icon={itemIcon(publish.status)}
				/>
			</div>
			<div className="flex flex-column align-items-center gap-2 pt-5 pb-4">
				{publish.caption ? (
					<img
						className="w-9 shadow-2 border-round"
						src={publish.caption}
						alt="caption"
					/>
				) : (
					<img
						className="h-9 shadow-2 border-round surface-card"
						src={baseImg}
						alt="caption"
					/>
				)}
				<div className="text-2xl font-bold">{publish.title}</div>
				{!!rating ? (
					<CustomRating rating={rating} numberOfRates={numberOfRatings} />
				) : (
					<span className="text-color-secondary">No reviews</span>
				)}
			</div>
			<div className="flex align-items-center justify-content-between">
				<p className="flex align-items-center text-lg">
					<i className="pi pi-users mr-2 text-2xl" />
					<span className="font-semibold">{enrolledUsers.length} students</span>
				</p>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded"
					onClick={() => navigate(`/creator/created-lectures/${id}`)}
				></Button>
			</div>
		</div>
	);
};

export default RenderGridItem;
