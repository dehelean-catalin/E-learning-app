export const findTypeOfDevice = (platform): string => {
	if (platform.product) {
		return platform.product;
	}
	return platform.name;
};
