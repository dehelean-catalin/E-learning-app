export const lastYearCheck = (createdAt) => {
	const thisYear = new Date().getFullYear();
	const checkYear = new Date(createdAt).getFullYear();
	console.log(thisYear, checkYear);
	return thisYear === checkYear;
};
