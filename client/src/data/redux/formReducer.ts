import { createAction, ActionType, Reducer, getType } from "typesafe-actions";

const actions = {
	openFormular: createAction(
		"openFormular",
		(payload: FormDataState) => payload
	)(),
	closeFormular: createAction("closeFormular")(),
};
export type FormDataState = {
	type: "register";
};
export type FormAction = ActionType<typeof actions>;
export const FormActions = actions;

export type FormState = Readonly<{
	form: FormDataState;
}>;

const INITIAL_STATE: FormState = { form: undefined };

const formReducer: Reducer<FormState, FormAction> = (
	state: FormState = INITIAL_STATE,
	action: FormAction
) => {
	switch (action.type) {
		case getType(FormActions.openFormular):
			return {
				...state,
				form: {
					...action.payload,
				},
			};
		case getType(FormActions.closeFormular):
			return {
				...state,
				form: undefined,
			};

		default:
			return state;
	}
};
export default formReducer;
