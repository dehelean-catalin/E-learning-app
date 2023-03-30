import TreeNode from "primereact/treenode";
import { createContext, FC, useState } from "react";

type UploadLectureContextState = {
	nodes: TreeNode[];
	onAddSection: (value: any) => void;
};
type UploadLectureProviderProps = {
	children: JSX.Element;
};

export const UploadLectureContext = createContext<UploadLectureContextState>({
	nodes: [],
	onAddSection: () => {},
});

export const UploadLectureProvider: FC<UploadLectureProviderProps> = ({
	children,
}) => {
	const [nodes, setNodes] = useState([]);

	const onAddSection = (value: TreeNode) => {
		console.log(value);
		setNodes([...nodes, value]);
	};

	const value: UploadLectureContextState = {
		nodes,
		onAddSection,
	};

	return (
		<UploadLectureContext.Provider value={value}>
			{children}
		</UploadLectureContext.Provider>
	);
};
