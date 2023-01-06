export interface WatchingLecture {
	id: string;
	items: WatchingLectureItem[];
}
export interface WatchingLectureItem {
	title: string;
	url: string;
	page: string;
	duration: number;
	currentProgress: number;
	confirmedProgress: number;
}
