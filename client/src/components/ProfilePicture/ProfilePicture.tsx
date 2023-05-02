import { FC } from "react";
import { initialsHelper } from "../../helpers/initialsHelper";
import styles from "./ProfilePicture.module.scss";

type Props = {
	picture?: string;
	initials: string;
	size?: "small" | "medium" | "large";
};
const ProfilePicture: FC<Props> = ({ picture, initials, size }) => {
	if (picture) {
		return (
			<img
				className={`${styles["profile-picture"]}  ${styles[size]}`}
				src={picture}
				alt=""
			/>
		);
	}

	return (
		<div className={`${styles["profile-icon"]} ${styles[size]}`}>
			{initialsHelper(initials)}
		</div>
	);
};

export default ProfilePicture;
