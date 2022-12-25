import {
	IProfilePicture,
	ProfileIconSize,
} from "../../../resources/models/models";
import styles from "./ProfilePicture.module.scss";
const ProfilePicture = ({
	picture,
	initials,
	size = ProfileIconSize.Small,
}: IProfilePicture) => {
	if (!picture) {
		return (
			<div className={`${styles["profile-icon"]} ${styles[size]}`}>
				{initials}
			</div>
		);
	}
	return (
		<img
			className={`${styles["profile-picture"]}  ${styles[size]}`}
			src={picture}
			alt=""
		/>
	);
};

export default ProfilePicture;
