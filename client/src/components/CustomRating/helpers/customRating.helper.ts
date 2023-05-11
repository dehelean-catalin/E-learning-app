export const convertToRelativeNumber = (num) => {
	const symbols = ["", "k", "M"];
	const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

	if (tier === 0) return num;

	const suffix = symbols[tier];
	const scale = Math.pow(10, tier * 3);
	const scaled = num / scale;

	return scaled + suffix;
};
