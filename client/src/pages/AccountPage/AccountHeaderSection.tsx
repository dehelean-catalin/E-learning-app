import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../common/ProfilePicture/ProfilePicture";
import { useAxios } from "../../config/axiosInstance";
import { UserDataModel } from "../../data/models/usersModel";
import { RootState } from "../../data/redux/reducers";
import { UserDataActions } from "../../data/redux/userDataReducer";

const AccountHeaderSection = () => {
	const axiosInstance = useAxios();
	const dispatch = useDispatch();
	const profilePicture = useSelector<RootState, string>(
		(s) => s.userDataReducer.data.profilePicture
	);
	const [file, setFile] = useState();
	const handleSubmitt = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		axiosInstance.post("/user/profile-picture", formData).then(() => {
			axiosInstance.get<UserDataModel>("/user/data").then((res) => {
				dispatch(UserDataActions.setUserData(res.data));
			});
		});
	};
	const selectFile = (event) => {
		if (event?.files?.length) {
			const file = event.files[0];
			setFile(file);
		}
	};
	return (
		<div>
			<section>
				<ProfilePicture initials="cd" size="large" picture={profilePicture} />
				<form onSubmit={handleSubmitt} encType="multipart/form-data">
					<input
						id="take-photo"
						onChange={(event) => {
							event.preventDefault();
							selectFile(event.target);
						}}
						type="file"
					/>
					<button>Click me</button>
				</form>
			</section>
		</div>
	);
};

export default AccountHeaderSection;
