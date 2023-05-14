import { Card } from "primereact/card";
import { FC } from "react";
import {
	CreatedLectureModel,
	Review,
} from "../../../../data/models/createdLecture.model";
import Header from "./Header";
import "./LectureArticle.scss";
import LectureArticleFooter from "./LectureArticleFooter";
import Subtitle from "./Subtitle";

type Props = {
	value: CreatedLectureModel;
	reviews: Review[];
};

const LectureArticle: FC<Props> = ({ value }) => {
	const {
		id,
		publish: {
			category,
			caption,
			title,
			description,
			author,
			language,
			promoVideo,
		},
		content,
		lastUpdate,
		rating,
		numberOfRatings,
		enrolledUsers,
	} = value;

	return (
		<Card
			className="lecture-card"
			title={title.toUpperCase()}
			header={
				<Header
					title={title.toUpperCase()}
					caption={caption}
					promoVideo={promoVideo}
				/>
			}
			subTitle={
				<Subtitle
					enrolledUsers={enrolledUsers}
					rating={rating}
					numberOfRatings={numberOfRatings}
					lastUpdate={lastUpdate}
					author={author}
					category={category}
					description={description}
					language={language}
				/>
			}
			footer={<LectureArticleFooter id={id} content={content} />}
		></Card>
	);
};

export default LectureArticle;
