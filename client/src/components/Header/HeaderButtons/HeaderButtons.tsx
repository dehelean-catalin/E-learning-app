import Divider from "components/Divider/Divider";
import ProfilePicture from "components/ProfilePicture/ProfilePicture";
import AuthContext from "data/context/auth-context";
import { AccountDataState } from "data/redux/AccountReducer";
import { RootState } from "data/redux/reducers";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef, useState } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { Review } from "../../../data/models/createdLecture.model";
import { LECTURE_OVERVIEW_ROUTE } from "../../../routes/baseRoutes";
import PRButton from "../../PRButton/PRButton";
import "./HeaderButtons.scss";
import LeaveRatingDialog from "./LeaveRatingDialog";

const HeaderButtons = () => {
	const op = useRef(null);
	const { userId } = useContext(AuthContext);
	const { logout } = useContext(AuthContext);
	const { pathname } = useLocation();
	const [visibile, setVisible] = useState(false);
	const { displayName, email, profilePicture } = useSelector<
		RootState,
		AccountDataState
	>((s) => s.accountReducer.data);

	const isMatchingLectureOverview = !!useMatch(LECTURE_OVERVIEW_ROUTE);
	const checkCreatorPath = pathname === "/create";
	const queryClient = useQueryClient();

	const data = queryClient.getQueryData("getLectureReview") as Review[];
	const isLectureReviewed = data?.find((d) => d.authorId === userId);

	return (
		<div className="header-buttons">
			{isMatchingLectureOverview && !isLectureReviewed && (
				<PRButton
					label="leave a rating"
					icon="pi pi-star"
					className="bg-transparent"
					onClick={() => setVisible(true)}
				/>
			)}

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
						<i className="pi pi-user text-xl mr-3" /> Profile
					</NavLink>
					<NavLink
						to={"/settings/saved-lectures"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<i className="pi pi-lock text-xl mr-3" /> Security
					</NavLink>
					<NavLink
						to={"/settings/account"}
						className={"row"}
						onClick={(e) => op.current.toggle(e)}
					>
						<i className="pi pi-cog text-xl mr-3" /> Settings
					</NavLink>

					<Divider />
					<div className={"row"} onClick={logout}>
						<VscSignOut fontSize="22px" /> Log out
					</div>
				</main>
			</OverlayPanel>
			<LeaveRatingDialog visible={visibile} onHide={() => setVisible(false)} />
		</div>
	);
};

export default HeaderButtons;
