import { AxiosInstance } from "axios";
import TreeNode from "primereact/treenode";

export const _getWatchingLectures = async (
	axios: AxiosInstance,
	id: string
): Promise<TreeNode[]> => {
	return await axios
		.get(`/user/watching-lectures/${id}`)
		.then((res) => res.data.items);
};
