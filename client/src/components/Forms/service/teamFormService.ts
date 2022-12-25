export const getDefaultAvatar = (name: string) => {
	if (name.split(" ").length === 1) {
		return name.slice(0, 2).toUpperCase();
	} else
		return name
			.split(" ")
			.map((word: string) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 3);
};

export const generateTeamID = () => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
