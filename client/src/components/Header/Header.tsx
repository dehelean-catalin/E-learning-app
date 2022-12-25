import { Divider } from "@mui/material";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef } from "react";
import { BsBookmark, BsPersonCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IUser, ProfileIconSize } from "../../resources/models/models";
import AuthContext from "../../store/context/auth-context";
import { AppInitializationState } from "../../store/redux/appInitializationReducer";
import { RootState } from "../../store/redux/reducers";
import ProfilePicture from "../common/ProfilePicture/ProfilePicture";
import styles from "./Header.module.scss";

const Header = () => {
	const op = useRef(null);
	const { logout } = useContext(AuthContext);
	const user: IUser = useSelector<RootState, AppInitializationState | any>(
		(s) => s.appInitializationReducer
	);
	const { firstName, lastName, profilePicture } = user;
	const initials =
		firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase();
	return (
		<header className={styles.header}>
			<div onClick={(e) => op.current.toggle(e)}>
				<ProfilePicture picture={profilePicture} initials={initials} />
			</div>
			<OverlayPanel ref={op} className={styles["profile-overlay"]}>
				<header>
					<ProfilePicture
						picture={profilePicture}
						initials={initials}
						size={ProfileIconSize.Medium}
					/>

					<div className={styles["profile-details"]}>
						<div>
							<span>{user.lastName}</span>
							<span>{user.firstName}</span>
						</div>
						{user.email}
					</div>
				</header>
				<main>
					<Divider />
					<NavLink
						to={"/settings/account"}
						className={styles.row}
						onClick={(e) => op.current.toggle(e)}
					>
						<BsPersonCircle fontSize="20px" /> My Account
					</NavLink>
					<NavLink
						to={"/settings/account"}
						className={styles.row}
						onClick={(e) => op.current.toggle(e)}
					>
						<IoSettingsOutline fontSize="22px" /> Settings
					</NavLink>
					<NavLink
						to={"/settings/saved-lectures"}
						className={styles.row}
						onClick={(e) => op.current.toggle(e)}
					>
						<BsBookmark fontSize="20px" /> Saved Lectures
					</NavLink>
					<Divider />
					<div className={styles.row} onClick={() => logout()}>
						<VscSignOut fontSize="22px" /> Log out
					</div>
				</main>
			</OverlayPanel>
		</header>
	);
};

export default Header;
