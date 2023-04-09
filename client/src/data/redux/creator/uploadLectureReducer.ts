import TreeNode from "primereact/treenode";
import { ActionType, createAction, getType, Reducer } from "typesafe-actions";

export const UploadLectureActions = {
	toggleVisibility: createAction(
		"toggleVisibility",
		(payload: boolean) => payload
	)(),
	toggleHeaderVisibility: createAction(
		"toggleHeaderVisibility",
		(payload: boolean) => payload
	)(),
	onAddNode: createAction("onAddNode", (payload: TreeNode) => payload)(),
	onDeleteNode: createAction(
		"onDeleteNode",
		(payload: string | number) => payload
	)(),
	onAddNodeChild: createAction(
		"onAddNodeChild",
		(payload: { key: string; data: TreeNode }) => payload
	)(),
	setSelectedNodeKey: createAction(
		"setSelectedNodeKey",
		(payload: string) => payload
	)(),
	clearState: createAction("clearState")(),
};

export type UploadLectureAction = ActionType<typeof UploadLectureActions>;

export type UploadLectureState = {
	visible: boolean;
	headerVisible: boolean;
	data: TreeNode[];
	selectedNodeKey: string;
};

const INITIAL_STATE: UploadLectureState = {
	visible: false,
	headerVisible: false,
	data: [],
	selectedNodeKey: null,
};

const uploadLectureReducer: Reducer<UploadLectureState, UploadLectureAction> = (
	state: UploadLectureState = INITIAL_STATE,
	action: UploadLectureAction
) => {
	switch (action.type) {
		case getType(UploadLectureActions.toggleVisibility): {
			return {
				...state,
				visible: action.payload,
			};
		}
		case getType(UploadLectureActions.toggleHeaderVisibility): {
			return {
				...state,
				headerVisible: action.payload,
			};
		}
		case getType(UploadLectureActions.onAddNode): {
			return {
				...state,
				data: [...state.data, action.payload],
			};
		}
		case getType(UploadLectureActions.onDeleteNode): {
			const newData = state.data.filter((node) => node.key !== action.payload);
			return {
				...state,
				data: newData,
			};
		}
		case getType(UploadLectureActions.onAddNodeChild): {
			const newData = state.data.map((node) => {
				if ((node.key as string) === action.payload.key) {
					const newChildren = [...node.children, action.payload.data];
					const newNode = { ...node, children: newChildren };
					return newNode;
				}
				return node;
			});
			return {
				...state,
				data: newData,
			};
		}
		case getType(UploadLectureActions.setSelectedNodeKey): {
			return {
				...state,
				selectedNodeKey: action.payload,
			};
		}
		case getType(UploadLectureActions.clearState):
			return {
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};
export default uploadLectureReducer;
