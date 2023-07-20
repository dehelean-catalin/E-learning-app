import { convertSecondsToTime } from "./data/helpers";

describe("convertSecondsToTime", () => {
	test("converts seconds to time correctly", () => {
		expect(convertSecondsToTime(15)).toBe("15 sec");

		expect(convertSecondsToTime(150)).toBe(" 3min ");

		expect(convertSecondsToTime(3720)).toBe(" 1h 2min ");

		expect(convertSecondsToTime(7200)).toBe(" 2h ");

		expect(convertSecondsToTime(90)).toBe(" 2min ");

		expect(convertSecondsToTime(0)).toBe("0 sec");
	});
});
