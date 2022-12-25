import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
// 	CloseBtn,
// 	CreateBtn,
// 	Description,
// 	Error,
// 	Form,
// 	Input,
// 	Field,
// 	Layer,
// 	Title,
// } from "../styled components/styled-form";

const CreateChannelForm = () => {
	const dispatch = useDispatch();
	const form = useSelector((state: { formReducer: any }) => state.formReducer);
	const [newChannel, setNewChannel] = useState("");
	const [privacy, setPrivacy] = useState("");
	const [error, setError] = useState("");
	const disabled = newChannel.length < 3 || newChannel.length > 25;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		Axios.get(
			`https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app/teams/${form.id}/channels.json`
		)
			.then((response) => {
				const channelExists = response.data.some(
					(channel: string) => channel === newChannel
				);
				!channelExists &&
					Axios.put(
						`https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app/teams/${form.id}/channels.json`,
						[...response.data, newChannel]
					).then(() => {
						dispatch({
							type: "getNotification",
							messageType: "succes",
							content: `Channel ${newChannel} was successfully created`,
						});
						dispatch({ type: "closeForm" });
					});
				channelExists &&
					dispatch({
						type: "getNotification",
						messageType: "error",
						content: `Channel name already exists `,
					});
			})
			.catch(() =>
				dispatch({
					type: "getNotification",
					messageType: "error",
					content: "Something went wrong",
				})
			);
	};

	return (
		// <Form onSubmit={handleSubmit}>
		// 	<Title>Create a channel</Title>
		// 	<Description>
		// 		Organize your team to be more efficient and productive with the channel
		// 		tool
		// 	</Description>
		// 	<Field>
		// 		Channel name
		// 		<Input
		// 			value={newChannel}
		// 			onChange={(e) => setNewChannel(e.target.value)}
		// 		/>
		// 		{error}
		// 	</Field>

		// 	<Field>
		// 		Privacy
		// 		<select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
		// 			<option value="Private">
		// 				Private - (Only team owners can add members)
		// 			</option>
		// 			<option value="Public">Public - (Anyoane can join)</option>
		// 		</select>
		// 	</Field>
		// 	<Field>
		// 		Add members<Input placeholder="Type @ to add new members..."></Input>
		// 	</Field>
		// 	<div>@you</div>
		// 	<Error>{error}</Error>

		// 	<Layer>
		// 		<CloseBtn onClick={() => dispatch({ type: "closeForm" })}>
		// 			Cancel
		// 		</CloseBtn>
		// 		<CreateBtn type="submit" disabled={disabled}>
		// 			Create
		// 		</CreateBtn>
		// 	</Layer>
		// </Form>
		<></>
	);
};

export default CreateChannelForm;
