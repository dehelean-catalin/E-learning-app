import { TreeNode } from "../../models/lecture-model";

export const lectureDurationInMinutesHelper = (data: TreeNode[]) => {
	let sum = 0;
	data.forEach((i) =>
		i.children.forEach((o) => {
			sum += o.data.duration;
		})
	);
	return Math.ceil(sum / 60);
};
