import Divider from "common/Divider/Divider";
import InputTextSearch from "common/InputTextSearch";
import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useContext, useRef } from "react";
import { BsBookmark, BsPersonCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfilePicture from "../../common/ProfilePicture/ProfilePicture";
import AuthContext from "../../data/context/auth-context";
import { AccountDataState } from "../../data/redux/account/AccountReducer";
import { RootState } from "../../data/redux/reducers";

import styles from "./Header.module.scss";

const Header: FC = () => {
	const op = useRef(null);
	const { logout } = useContext(AuthContext);
	const userData = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);

	const { displayName, email } = userData;

	return (
		<header className={styles.header}>
			<div>name</div>
			<InputTextSearch />
			<div className={styles.toogleIcon} onClick={(e) => op.current.toggle(e)}>
				<ProfilePicture
					picture={userData.profilePicture}
					initials={displayName}
				/>
			</div>
			<OverlayPanel ref={op} className={styles["profile-overlay"]}>
				<header>
					<ProfilePicture
						picture={userData.profilePicture}
						initials={displayName}
						size={"medium"}
					/>

					<div className={styles["profile-details"]}>
						<span>{userData?.displayName}</span>
						{email}
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
					<div className={styles.row} onClick={logout}>
						<VscSignOut fontSize="22px" /> Log out
					</div>
				</main>
			</OverlayPanel>
		</header>
	);
};

export default Header;
