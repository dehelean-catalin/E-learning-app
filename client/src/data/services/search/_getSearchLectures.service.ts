import { AxiosInstance } from "axios";
import { QueryFilterParams } from "data/models/search/searchFilterModel";
import { LectureCard } from "../../models/lectureModel";

export const getSearchLectures = async (
	axios: AxiosInstance,
	params: QueryFilterParams
): Promise<LectureCard[]> => {
	return await axios
		.get("/search", {
			params,
		})
		.then((res) => res.data);
};
