import TreeNode from "primereact/treenode";
import { createContext, FC, useState } from "react";

type UploadLectureContextState = {
	nodes: TreeNode[];
	onAddSectionItem: (value: TreeNode, key: string | number) => void;
};

type UploadLectureProviderProps = {
	children: JSX.Element;
};

const INITIAL_STATE = [];

export const UploadLectureContext = createContext<UploadLectureContextState>({
	nodes: [],
	onAddSectionItem: () => {},
});

export const UploadLectureProvider: FC<UploadLectureProviderProps> = ({
	children,
}) => {
	const [nodes, setNodes] = useState<TreeNode[]>(INITIAL_STATE);

	const onAddSectionItem = (value, key) => {
		nodes.forEach((node) => {
			if (node.key === key && node?.children) node.children.push(value);
		});

		setNodes(nodes);
	};

	const constextValue: UploadLectureContextState = {
		nodes,
		onAddSectionItem,
	};

	return (
		<UploadLectureContext.Provider value={constextValue}>
			{children}
		</UploadLectureContext.Provider>
	);
};
