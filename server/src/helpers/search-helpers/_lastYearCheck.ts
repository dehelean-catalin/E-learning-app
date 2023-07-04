export const lastYearCheck = (createdAt) => {
	const thisYear = new Date().getFullYear();
	const checkYear = new Date(createdAt).getFullYear();

	return thisYear === checkYear;
};
