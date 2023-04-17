export const getRelativeTime = (timestamp: number) => {
	const timeNow = new Date().getTime();
	const secondsPast = (timeNow - timestamp) / 1000;

	if (secondsPast < 60) return `${Math.floor(secondsPast)}s ago`;

	if (secondsPast < 3600) {
		const minutes = Math.floor(secondsPast / 60);
		return `${minutes}m ago`;
	}

	if (secondsPast < 86400) {
		const hours = Math.floor(secondsPast / 3600);
		return `${hours}h ago`;
	}

	const days = Math.floor(secondsPast / 86400);
	return `${days}d ago`;
};
