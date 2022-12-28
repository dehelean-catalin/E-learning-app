import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import { BsBookmark, BsPersonCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import {
	HeaderDataModel,
	ProfileIconSize,
} from "../../resources/models/usersModel";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import Divider from "../common/Divider";
import ProfilePicture from "../common/ProfilePicture/ProfilePicture";
import styles from "./Header.module.scss";
import { FC } from "react";
import useFetchQuery from "../../hooks/useFetchQuery";

const Header: FC = () => {
	const op = useRef(null);
	const { logout } = useContext(AuthContext);

	const { data: lala, isError } = useFetchQuery(
		"/app-initialization",
		() => {
			return Axios.get<HeaderDataModel>("/app-initialization").then(
				(res) => res.data
			);
		},
		{
			initialData: {
				email: "",
				firstName: "",
				lastName: "",
				profilePicture: "",
			},
			onSuccess: () => console.log("a"),
			onError: () => console.log("a"),
		}
	);
	const data = lala as HeaderDataModel;
	const { firstName, lastName, email } = data;

	const initials =
		firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase();

	if (isError) {
		return <>error</>;
	}
	return (
		<header className={styles.header}>
			<div className={styles.toogleIcon} onClick={(e) => op.current.toggle(e)}>
				<ProfilePicture picture={""} initials={initials} />
			</div>
			<OverlayPanel ref={op} className={styles["profile-overlay"]}>
				<header>
					<ProfilePicture
						picture={""}
						initials={initials}
						size={ProfileIconSize.Medium}
					/>

					<div className={styles["profile-details"]}>
						<div>
							<span>{lastName}</span>
							<span>{firstName}</span>
						</div>
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
