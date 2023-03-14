export const todayCheck = (createdAt) => {
	const currentDay = new Date();

	return currentDay.toDateString() === new Date(createdAt).toDateString();
};
