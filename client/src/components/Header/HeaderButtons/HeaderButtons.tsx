import Divider from "components/Divider/Divider";
import ProfilePicture from "components/ProfilePicture/ProfilePicture";
import AuthContext from "data/context/auth-context";

import { RootState } from "data/redux/reducers";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { AccountDataState } from "../../../data/redux/AccountReducer";
import "./HeaderButtons.scss";
import LectureButtons from "./LectureButtons";

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
			<LectureButtons />
			{checkCreatorPath ? (
				<></>
			) : (
				<NavLink to={"/create"} className="ml-3">
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
						<i className="pi pi-user text-xl mr-3" /> Profile
					</NavLink>
					<NavLink
						to={"/settings/change-password"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<i className="pi pi-lock text-xl mr-3" /> Security
					</NavLink>

					<Divider />
					<div className={"row"} onClick={logout}>
						<i className="pi pi-sign-out text-xl mr-3" /> Log out
					</div>
				</main>
			</OverlayPanel>
		</div>
	);
};

export default HeaderButtons;
