import baseImg from "images/test.png";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { FC } from "react";
import { useNavigate } from "react-router";
import { CustomRating } from "../../../components/CustomRating/CustomRating";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import { toRelativeTime } from "../../../helpers";
import { itemIcon, itemStatus } from "./item.helper";

const RenderListItem: FC<{ value: CreatedLectureModel }> = ({ value }) => {
	const navigate = useNavigate();
	const { reviews, publish, lastUpdate } = value;

	return (
		<div className="col-12">
			<div className="flex p-4 gap-4">
				{publish.caption ? (
					<img
						className="w-16rem shadow-2 block border-round"
						src={publish.caption}
						alt="caption"
					/>
				) : (
					<img
						className="w-16rem shadow-2 border-round"
						src={baseImg}
						alt="caption"
					/>
				)}
				<div className="flex justify-content-between flex-1 gap-4">
					<div className="flex flex-column gap-2">
						<div className="flex align-items-center gap-3">
							<span className="flex align-items-center gap-2">
								<i className="pi pi-history" />
								<span className="text-color-secondary">
									{toRelativeTime(lastUpdate)}
								</span>
							</span>
							<Tag
								value={publish.status}
								className={itemStatus(publish.status)}
								icon={itemIcon(publish.status)}
							/>
						</div>
						<div className="text-2xl font-bold text-900">{publish.title} </div>
						<div className="flex gap-2">
							{!!reviews.length ? (
								<CustomRating reviews={reviews} />
							) : (
								<span className="text-color-secondary">No reviews</span>
							)}
						</div>
					</div>
					<div className="flex flex-column align-items-end gap-3">
						<p className="flex align-items-center text-lg">
							<i className="pi pi-users mr-2 text-2xl" />
							<span className="font-semibold">
								{value.enrolledUsers.length} students
							</span>
						</p>
						<Button
							icon="pi pi-pencil"
							className="p-button-rounded"
							onClick={() => navigate(`/creator/created-lectures/${value.id}`)}
						></Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderListItem;
