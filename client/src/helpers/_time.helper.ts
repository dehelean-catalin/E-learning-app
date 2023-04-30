import { Content } from "../data/models/createdLecture.model";

export const toRelativeTime = (time: number) => {
	const timeNow = new Date().getTime();
	const secondsPast = (timeNow - time) / 1000;

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

export const formattedVideoDuration = (time: number) => {
	const formattedTime = Math.round(time);
	if (!formattedTime) return;

	if (formattedTime < 60) return `${formattedTime} s`;

	if (formattedTime < 3600) return `${(formattedTime / 60).toFixed(2)} min`;

	return `${(formattedTime / 3600).toFixed(2)} h`;
};

export const formattedDate = (date: string): string | "Invalid Date" => {
	const currentDate = new Date(date);

	if (currentDate.toString() === "Invalid Date") return "Invalid Date";

	const formattedDay = currentDate.getDate();
	const formattedMonth = currentDate.getMonth() + 1;
	const formattedYear = currentDate.getFullYear();

	return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export const lectureDurationBasedOnContent = (data: Content[]) => {
	let totalDuration = 0;

	for (const i in data) {
		for (const j in data[i].children) {
			totalDuration += data[i].children[j].data.duration;
		}
	}

	return totalDuration;
};
