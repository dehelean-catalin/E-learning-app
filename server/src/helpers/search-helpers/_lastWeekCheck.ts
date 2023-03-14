export const lastWeekCheck = (createdAt) => {
	const endTime = new Date().getTime();
	const checkTime = new Date(createdAt).getTime();
	const beginTime = new Date();
	beginTime.setDate(beginTime.getDate() - 7);

	return checkTime >= beginTime.getTime() && checkTime <= endTime;
};
