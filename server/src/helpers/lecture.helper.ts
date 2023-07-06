import { QueryFilterParams, SearchedLecture } from "../models/lectureModels";

const lastHourCheck = (createdAt: number) => {
	const endTime = new Date().getTime();
	const checkTime = new Date(createdAt).getTime();
	const beginTime = new Date();
	beginTime.setHours(beginTime.getHours() - 1);

	return checkTime >= beginTime.getTime() && checkTime <= endTime;
};

const todayCheck = (createdAt: number) => {
	const currentDay = new Date();

	return currentDay.toDateString() === new Date(createdAt).toDateString();
};

const lastDaysCheck = (createdAt: number, days: 7 | 30) => {
	const endTime = new Date().getTime();
	const checkTime = new Date(createdAt).getTime();
	const beginTime = new Date();
	beginTime.setDate(beginTime.getDate() - days);

	return checkTime >= beginTime.getTime() && checkTime <= endTime;
};

const lastYearCheck = (createdAt) => {
	const thisYear = new Date().getFullYear();
	const checkYear = new Date(createdAt).getFullYear();

	return thisYear === checkYear;
};

export const applyFilters = (
	lectures: SearchedLecture[],
	filters: QueryFilterParams
) => {
	if (filters.rating) {
		const { rating } = filters;

		if (rating === "9g")
			lectures = lectures.filter(
				({ rating, numberOfRatings }) => rating / numberOfRatings >= 4.5
			);

		if (rating === "8-9b")
			lectures = lectures.filter(
				({ rating, numberOfRatings }) => rating / numberOfRatings >= 3
			);

		if (rating === "8u")
			lectures = lectures.filter(
				({ numberOfRatings, rating }) => rating / numberOfRatings < 3
			);
	}

	if (filters.language)
		lectures = lectures.filter((doc) => doc.language === filters.language);

	if (filters.duration) {
		const { duration } = filters;
		if (duration === "4u") {
			lectures = lectures.filter(({ duration }) => duration / 3600 < 240);
		}
		if (duration === "4-16b") {
			lectures = lectures.filter(
				({ duration }) => duration / 3600 >= 240 && duration / 3600 < 960
			);
		}
		if (duration === "16-40b") {
			lectures = lectures.filter(
				({ duration }) => duration / 3600 >= 960 && duration / 3600 < 2400
			);
		}
		if (duration === "40g") {
			lectures = lectures.filter(({ duration }) => duration / 3600 >= 2400);
		}
	}

	if (filters.date) {
		const { date } = filters;
		if (date === "lh") {
			lectures = lectures.filter(({ lastUpdate }) => lastHourCheck(lastUpdate));
		}
		if (date === "td") {
			lectures = lectures.filter(({ lastUpdate }) => todayCheck(lastUpdate));
		}
		if (date === "lw") {
			lectures = lectures.filter(({ lastUpdate }) =>
				lastDaysCheck(lastUpdate, 7)
			);
		}
		if (date === "lm") {
			lectures = lectures.filter(({ lastUpdate }) =>
				lastDaysCheck(lastUpdate, 30)
			);
		}
		if (date === "ly") {
			lectures = lectures.filter(({ lastUpdate }) => lastYearCheck(lastUpdate));
		}
	}

	return lectures;
};
