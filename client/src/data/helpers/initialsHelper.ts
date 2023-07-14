export const initialsHelper = (initials: string | null) => {
	const initialsSplited = initials?.split(" ");

	if (initialsSplited.length === 1) {
		return initialsSplited[0].slice(0, 2);
	}
	return initialsSplited[0].slice(0, 1) + initialsSplited[1].slice(0, 1);
};
