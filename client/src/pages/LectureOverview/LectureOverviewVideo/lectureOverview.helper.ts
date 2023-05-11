import {
	Content,
	ContentData,
} from "../../../data/models/createdLecture.model";

export const getChapterVideoWithProgress = (
	data: Content[],
	chapterId
): ContentData | undefined => {
	let content;
	for (const i in data) {
		for (const j in data[i].children) {
			if (data[i].children[j].data.id === chapterId)
				content = data[i].children[j].data;
		}
	}

	return content;
};
