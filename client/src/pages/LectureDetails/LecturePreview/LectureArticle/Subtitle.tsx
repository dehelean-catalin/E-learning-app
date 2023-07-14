import { FC } from "react";
import { CustomRating } from "../../../../components/CustomRating/CustomRating";
import { toRelativeTime } from "../../../../data/helpers";

type SubtitleProps = {
	lastUpdate: number;
	author: string;
	language: string;
	category: string;
	description: string;
	rating: number;
	enrolledUsers: number;
	numberOfRatings: number;
};

const Subtitle: FC<SubtitleProps> = ({
	lastUpdate,
	language,
	category,
	author,
	description,
	rating,
	enrolledUsers,
	numberOfRatings,
}) => {
	return (
		<div className="subtitle">
			<p className="description">{description}</p>
			<CustomRating
				rating={rating}
				numberOfRates={numberOfRatings}
				enrolledUsers={enrolledUsers}
			/>
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
