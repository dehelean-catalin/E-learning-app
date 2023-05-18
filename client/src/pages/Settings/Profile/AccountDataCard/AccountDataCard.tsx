import { ChangeEvent } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import Spinner from "../../../../components/Spinner/Spinner";
import {
	AccountDataActions,
	AccountDataState,
} from "../../../../data/redux/AccountReducer";
import { RootState } from "../../../../data/redux/reducers";
import { useAxios } from "../../../../hooks/useAxios";
import "./AccountDataCard.scss";

const AccountDataCard = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const data = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);

	const { mutate: handleChangeProfilePicture, isLoading } = useMutation(
		"putProfilePicture",
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (e.target.files?.length) {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append("file", file);
				return axios
					.put("/profile-picture", formData)
					.then((res) =>
						dispatch(AccountDataActions.setProfilePictureSucces(res.data))
					);
			}
		}
	);

	const profilePicture = isLoading ? (
		<Spinner />
	) : (
		<>
			<ProfilePicture
				initials={data.displayName}
				size="large"
				picture={data.profilePicture}
			/>
			<input
				id="take-photo"
				type="file"
				accept="image/*"
				onChange={handleChangeProfilePicture}
			/>
			<i className="pi pi-plus" aria-label="icon" />
		</>
	);

	return (
		<article className="account-data-card">
			<div className="picture-container">{profilePicture}</div>
			<div>
				<h2>{data.displayName}</h2>
				<p>{data.email}</p>

				{data.address && <span>{data.address}</span>}
			</div>
		</article>
	);
};

export default AccountDataCard;
