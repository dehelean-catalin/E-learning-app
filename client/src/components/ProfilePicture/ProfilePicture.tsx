import { Avatar } from "primereact/avatar";
import { FC } from "react";
import { initialsHelper } from "../../data/helpers/initialsHelper";
import styles from "./ProfilePicture.module.scss";
type Props = {
	picture?: string;
	initials: string;
	className?: string;
	icon?: JSX.Element;
	size?: "small" | "medium" | "large";
};
const ProfilePicture: FC<Props> = ({
	picture,
	initials,
	size = "small",
	className = "",
	icon,
}) => {
	if (!initials) return;

	if (icon) {
		return <Avatar icon={icon} size="large" shape="circle" />;
	}

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
		<div className={`${styles["profile-icon"]} ${styles[size]} ${className}`}>
			{initialsHelper(initials)}
		</div>
	);
};

export default ProfilePicture;
