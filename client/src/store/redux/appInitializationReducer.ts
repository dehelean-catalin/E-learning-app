import { Reducer } from "redux";
import { ActionType, createAction, getType } from "typesafe-actions";

const actions = {
	getInitializationData: createAction(
		"getInitializationData",
		(payload: AppInitializationState) => payload
	)(),
};
export type AppInitializationState = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	favoriteTopics: string;
	degree: string;
	institution: string;
	institutionKey: string;
	jobTitle: string;
	profilePicture: string;
	aboutYou: string;
	links: string;
	role: "user" | "admin";
};
export type AppInitializationAction = ActionType<typeof actions>;
export const AppInitializationActions = actions;

const INITIAL_STATE: AppInitializationState = {
	email: "",
	firstName: "",
	lastName: "",
	phone: "",
	address: "",
	favoriteTopics: "",
	degree: "",
	institution: "",
	institutionKey: "",
	jobTitle: "",
	profilePicture: "",
	aboutYou: "",
	links: "",
	role: "user",
};

const appInitializationReducer: Reducer<
	AppInitializationState,
	AppInitializationAction
> = (
	state: AppInitializationState = INITIAL_STATE,
	action: AppInitializationAction
) => {
	switch (action.type) {
		case getType(AppInitializationActions.getInitializationData):
			return {
				...state,
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				phone: action.payload.phone,
				address: action.payload.address,
				favoriteTopics: action.payload.favoriteTopics,
				degree: action.payload.degree,
				institution: action.payload.institution,
				jobTitle: action.payload.jobTitle,
				profilePicture: action.payload.profilePicture,
				aboutYou: action.payload.aboutYou,
				links: action.payload.links,
				role: action.payload.role,
			};

		default:
			return state;
	}
};

export default appInitializationReducer;
