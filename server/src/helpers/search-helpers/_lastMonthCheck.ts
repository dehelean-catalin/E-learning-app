export const lastMonthCheck = (createdAt) => {
	const endTime = new Date().getTime();
	const checkTime = new Date(createdAt).getTime();
	const beginTime = new Date();
	beginTime.setDate(beginTime.getDate() - 30);

	return checkTime >= beginTime.getTime() && checkTime <= endTime;
};
