import { createAction, ActionType, getType, Reducer } from "typesafe-actions";
import { BannerNotificationType } from "../../resources/models/usersModel";

const actions = {
	showBannerNotification: createAction(
		"showBannerNotification",
		(payload: Omit<BannerNotificationState, "timeout">) => payload
	)(),
	clearBannerMessage: createAction("clearBannerNotification")(),
};
export type BannerNotificationState = {
	type: BannerNotificationType;
	message: string;
	action?: string;
	timeout?: number;
};
export type NotificationAction = ActionType<typeof actions>;
export const NotificationActions = actions;

export type NotificationState = Readonly<{
	bannerNotification?: BannerNotificationState;
}>;

const INITIAL_STATE: NotificationState = {
	bannerNotification: undefined,
};

const notificationReducer: Reducer<NotificationState, NotificationAction> = (
	state: NotificationState = INITIAL_STATE,
	action: NotificationAction
) => {
	switch (action.type) {
		case getType(NotificationActions.showBannerNotification):
			return {
				...state,
				bannerNotification: {
					...action.payload,
					timeout: 5000,
				},
			};
		case getType(NotificationActions.clearBannerMessage):
			return {
				...state,
				bannerNotification: undefined,
			};
		default:
			return state;
	}
};

export default notificationReducer;
