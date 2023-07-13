import { createAction, createReducer } from "@reduxjs/toolkit";

export const showConfirmDialog = createAction<{
	message?: string;
	onConfirm: () => void;
}>("showConfirmDialog");
export const hideConfirmDialog = createAction("hideConfirmDialog");

export const showVideoDialog = createAction<{ title: string; src: string }>(
	"showVideoDialog"
);
export const hideVideoDialog = createAction("hideVideoDialog");

export type ConfirmDialogState = {
	isOpen: boolean;
	message?: string;
	onConfirm?: () => void;
};

export type VideoDialogState = {
	isOpen: boolean;
	title?: string;
	src?: string;
};

export type DialogState = {
	confirmDialog: ConfirmDialogState;
	videoDialog: VideoDialogState;
};

const INITIAL_STATE: DialogState = {
	confirmDialog: {
		isOpen: false,
	},
	videoDialog: {
		isOpen: false,
	},
};

const dialogReducer = createReducer(INITIAL_STATE, (builder) => {
	builder.addCase(showConfirmDialog, (state, action) => {
		state.confirmDialog.isOpen = true;
		state.confirmDialog.message = action.payload.message;
		state.confirmDialog.onConfirm = action.payload.onConfirm;
	});
	builder.addCase(hideConfirmDialog, (state, action) => {
		state.confirmDialog = INITIAL_STATE.confirmDialog;
	});
	builder.addCase(showVideoDialog, (state, action) => {
		state.videoDialog.isOpen = true;
		state.videoDialog.src = action.payload.src;
		state.videoDialog.title = action.payload.title;
	});
	builder.addCase(hideVideoDialog, (state, action) => {
		state.videoDialog = INITIAL_STATE.videoDialog;
	});
});

export default dialogReducer;
