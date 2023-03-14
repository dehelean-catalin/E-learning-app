export const lastHourCheck = (createdAt) => {
	const endTime = new Date().getTime();
	const checkTime = new Date(createdAt).getTime();
	const beginTime = new Date();
	beginTime.setHours(beginTime.getHours() - 1);

	return checkTime >= beginTime.getTime() && checkTime <= endTime;
};
