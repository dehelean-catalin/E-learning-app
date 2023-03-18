import { AxiosInstance } from "axios";
import { QueryFilterParams } from "data/models/search/searchFilterModel";
import { LectureModel } from "../../models/lectureModel";

export const getSearchLectures = async (
	axios: AxiosInstance,
	params: QueryFilterParams
): Promise<LectureModel[]> => {
	return await axios
		.get("/search", {
			params,
		})
		.then((res) => res.data);
};
