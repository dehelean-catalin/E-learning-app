export const toRelativeTime = (timestamp: number) => {
	const timeNow = new Date().getTime();
	const secondsPast = (timeNow - timestamp) / 1000;

	if (secondsPast < 60) return `${Math.ceil(secondsPast)}s ago`;

	if (secondsPast < 3600) {
		const minutes = Math.ceil(secondsPast / 60);
		return `${minutes}m ago`;
	}

	if (secondsPast < 86400) {
		const hours = Math.ceil(secondsPast / 3600);
		return `${hours}h ago`;
	}

	const days = Math.ceil(secondsPast / 86400);
	return `${days}d ago`;
};
