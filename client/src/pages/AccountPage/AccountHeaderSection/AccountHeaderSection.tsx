import { ChangeEvent } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import Spinner from "../../../components/Spinner/Spinner";
import {
	AccountDataActions,
	AccountDataState,
} from "../../../data/redux/account/AccountReducer";
import { RootState } from "../../../data/redux/reducers";
import styles from "./AccountHeaderSection.module.scss";

const AccountHeaderSection = () => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);
	const profileLoading = useSelector<RootState, boolean>(
		(s) => s.accountReducer.profileLoading
	);
	const bannerLoading = useSelector<RootState, boolean>(
		(s) => s.accountReducer.bannerLoading
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			dispatch(AccountDataActions.setProfilePictureRequest(formData));
		}
	};

	const uploadProfileBanner = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			dispatch(AccountDataActions.setProfileBannerRequest(formData));
		}
	};

	const profilePicture = profileLoading ? (
		<Spinner />
	) : (
		<>
			<ProfilePicture
				initials="cd"
				size="large"
				picture={data.profilePicture}
			/>
			<input
				id="take-photo"
				className={styles["profile-picture"]}
				type="file"
				onChange={handleChange}
			/>
			<BiPlusMedical className={styles.edit} />
		</>
	);

	const profileBanner = bannerLoading ? (
		<Spinner />
	) : (
		<>
			<img
				className={styles["banner-picture"]}
				src={data.bannerPicture}
				alt="ups"
			/>
			<input
				id="take-photo"
				className={styles["profile-banner"]}
				type="file"
				onChange={uploadProfileBanner}
			/>
		</>
	);

	return (
		<div className={styles["account-header-section"]}>
			{profileBanner}
			<main>{profilePicture}</main>
			<div className={styles.details}>
				<div>
					<div className={styles.name}>{data.displayName}</div>
					<div className={styles.row}>
						<HiOutlineMail />
						<span>{data.email}</span>
						{data.address && (
							<div className={styles.address}>
								<IoLocationOutline />
								{data.address}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountHeaderSection;
