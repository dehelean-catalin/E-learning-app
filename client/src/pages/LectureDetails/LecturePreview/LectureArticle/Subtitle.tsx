import { FC } from "react";
import { CustomRating } from "../../../../components/CustomRating/CustomRating";
import { toRelativeTime } from "../../../../helpers";

type SubtitleProps = {
	lastUpdate: number;
	author: string;
	language: string;
	category: string;
	description: string;
};
export const DUMMY_REVIEWS = [
	{
		date: new Date().toLocaleString(),
		author: "ciupi",
		message: "cff",
		rating: 9,
	},
	{
		date: new Date().toLocaleString(),
		author: "ciupi",
		message: "cff",
		rating: 9,
	},
	{
		date: new Date().toLocaleString(),
		author: "ciupi",
		message: "cff",
		rating: 9,
	},
	{
		date: new Date().toLocaleString(),
		author: "ciupi",
		message: "cff",
		rating: 7,
	},
	{
		date: new Date().toLocaleString(),
		author: "ciupi",
		message: "cff",
		rating: 8,
	},
];
const Subtitle: FC<SubtitleProps> = ({
	lastUpdate,
	language,
	category,
	author,
	description,
}) => {
	return (
		<div className="subtitle">
			<h3>{description}</h3>
			<CustomRating reviews={DUMMY_REVIEWS} enrolledUsers={200000} />
			<p>Author: {author}</p>
			<p className="flex gap-3 align-items-center">
				<span>
					<i className="pi pi-tag mr-2" />
					{category}
				</span>
				<span>
					<i className="pi pi-globe mr-2" />
					{language}
				</span>
				<span>
					<i className="pi pi-history mr-2" />
					Last updated: {toRelativeTime(lastUpdate)}
				</span>
			</p>
		</div>
	);
};

export default Subtitle;
