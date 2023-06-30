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
	const { id, publish } = value;

	return (
		<Card
			className="lecture-card"
			title={publish.title.toUpperCase()}
			header={
				<Header
					title={publish.title.toUpperCase()}
					caption={publish.caption}
					promoVideo={publish.promoVideo}
				/>
			}
			subTitle={
				<Subtitle
					enrolledUsers={value.enrolledUsers.length}
					rating={value.rating}
					numberOfRatings={value.numberOfRatings}
					lastUpdate={value.lastUpdate}
					author={publish.author}
					category={publish.category}
					description={publish.description}
					language={publish.language}
				/>
			}
			footer={<LectureArticleFooter id={id} content={value.content} />}
		></Card>
	);
};

export default LectureArticle;
