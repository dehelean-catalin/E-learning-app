import Divider from "common/Divider/Divider";
import ProfilePicture from "common/ProfilePicture/ProfilePicture";
import AuthContext from "data/context/auth-context";
import { AccountDataState } from "data/redux/account/AccountReducer";
import { RootState } from "data/redux/reducers";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { BsBookmark, BsPersonCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import "./HeaderButtons.scss";

const HeaderButtons = () => {
	const op = useRef(null);
	const { logout } = useContext(AuthContext);
	const { pathname } = useLocation();
	const { displayName, email, profilePicture } = useSelector<
		RootState,
		AccountDataState
	>((s) => s.accountReducer.data);

	const checkCreatorPath = pathname === "/create";

	return (
		<div className="header-buttons">
			{checkCreatorPath ? (
				<></>
			) : (
				<NavLink to={"/create"}>
					<BiVideoPlus color="white" fontSize="2rem" />
				</NavLink>
			)}

			<div className={"toogleIcon"} onClick={(e) => op.current.toggle(e)}>
				<ProfilePicture picture={profilePicture} initials={displayName} />
			</div>

			<OverlayPanel ref={op} className={"profile-overlay"}>
				<header>
					<ProfilePicture
						picture={profilePicture}
						initials={displayName}
						size={"medium"}
					/>

					<div className={"profile-details"}>
						<span>{displayName}</span>
						{email}
					</div>
				</header>
				<main>
					<Divider />
					<NavLink
						to={"/settings/account"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<BsPersonCircle fontSize="20px" /> My Account
					</NavLink>
					<NavLink
						to={"/creator/created-lectures"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<RxDashboard fontSize="20px" /> Creator Dashboard
					</NavLink>
					<NavLink
						to={"/settings/account"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<IoSettingsOutline fontSize="22px" /> Settings
					</NavLink>
					<NavLink
						to={"/settings/saved-lectures"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<BsBookmark fontSize="20px" /> Saved Lectures
					</NavLink>
					<Divider />
					<div className={"row"} onClick={logout}>
						<VscSignOut fontSize="22px" /> Log out
					</div>
				</main>
			</OverlayPanel>
		</div>
	);
};

export default HeaderButtons;
