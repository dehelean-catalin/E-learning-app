import { ActionType, createAction, getType, Reducer } from "typesafe-actions";

export const EditLectureActions = {
	setData: createAction("setData", (payload: any) => payload)(),

	clearState: createAction("clearState")(),
};

export type EditLectureAction = ActionType<typeof EditLectureActions>;

export type EditLectureState = {
	data: any;
};

const INITIAL_STATE: EditLectureState = {
	data: {},
};

const editLectureReducer: Reducer<EditLectureState, EditLectureAction> = (
	state: EditLectureState = INITIAL_STATE,
	action: EditLectureAction
) => {
	switch (action.type) {
		case getType(EditLectureActions.setData): {
			return {
				...state,
				data: action.payload,
			};
		}

		case getType(EditLectureActions.clearState):
			return {
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};
export default editLectureReducer;
