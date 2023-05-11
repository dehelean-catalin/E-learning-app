import { Card } from "primereact/card";
import { FC } from "react";
import { CreatedLectureModel } from "../../../../data/models/createdLecture.model";
import Header from "./Header";
import "./LectureArticle.scss";
import LectureArticleFooter from "./LectureArticleFooter";
import Subtitle from "./Subtitle";

type Props = {
	value: CreatedLectureModel;
};

const LectureArticle: FC<Props> = ({ value }) => {
	const {
		enrolledUsers,
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
					lastUpdate={lastUpdate}
					author={author}
					category={category}
					description={description}
					language={language}
				/>
			}
			footer={
				<LectureArticleFooter
					id={id}
					content={content}
					enrolledUsers={enrolledUsers}
				/>
			}
		></Card>
	);
};

export default LectureArticle;
