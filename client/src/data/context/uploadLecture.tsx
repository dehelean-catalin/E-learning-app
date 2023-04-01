import TreeNode from "primereact/treenode";
import { createContext, FC, useState } from "react";

type UploadLectureContextState = {
	nodes: TreeNode[];
	onAddSection: (value: any) => void;
	onDeleteSection: (key: string | number) => void;
	onAddSectionItem: (value: TreeNode, key: string | number) => void;
};

type UploadLectureProviderProps = {
	children: JSX.Element;
};

const INITIAL_STATE = [
	{
		key: "1",
		label: "Intro",
		children: [
			{
				key: "1-1",
				label: "Intro",
			},
			{
				key: "1-2",
				label: "Intro",
			},
			{
				key: "1-3",
				label: "123",
			},
		],
	},
];

export const UploadLectureContext = createContext<UploadLectureContextState>({
	nodes: [],
	onAddSection: () => {},
	onDeleteSection: () => {},
	onAddSectionItem: () => {},
});

export const UploadLectureProvider: FC<UploadLectureProviderProps> = ({
	children,
}) => {
	const [nodes, setNodes] = useState<TreeNode[]>(INITIAL_STATE);

	const onAddSection = (value: TreeNode) => {
		console.log(value);
		setNodes([...nodes, value]);
	};

	const onDeleteSection = (key) => {
		setNodes(nodes.filter((node) => node.key !== key));
	};

	const onAddSectionItem = (value, key) => {
		nodes.forEach((node) => {
			if (node.key === key && node?.children) node.children.push(value);
		});

		setNodes(nodes);
	};

	const constextValue: UploadLectureContextState = {
		nodes,
		onAddSection,
		onDeleteSection,
		onAddSectionItem,
	};

	return (
		<UploadLectureContext.Provider value={constextValue}>
			{children}
		</UploadLectureContext.Provider>
	);
};
