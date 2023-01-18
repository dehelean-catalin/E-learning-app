import { BiPlusMedical } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../common/Button/Button";
import ProfilePicture from "../../../common/ProfilePicture/ProfilePicture";
import Spinner from "../../../common/Spinner/Spinner";
import {
	AccountDataActions,
	AccountDataState,
} from "../../../data/redux/account/AccountReducer";
import { RootState } from "../../../data/redux/reducers";
import styles from "./AccountHeaderSection.module.scss";
import gmail from "../../../resources/icons/gmail.png";

const AccountHeaderSection = () => {
	const dispatch = useDispatch();
	const data = useSelector<RootState, AccountDataState>(
		(s) => s.accountReducer.data
	);
	const loading = useSelector<RootState, boolean>(
		(s) => s.accountReducer.loading
	);
	const handleChange = (e) => {
		if (e?.files?.length) {
			const file = e.files[0];
			const formData = new FormData();
			formData.append("file", file);
			dispatch(AccountDataActions.setProfilePictureRequest(formData));
		}
	};
	const getContent = () => {
		if (loading) {
			return <Spinner />;
		}
		return (
			<>
				<ProfilePicture
					initials="cd"
					size="large"
					picture={data.profilePicture}
				/>
				<input
					id="take-photo"
					onChange={(event) => {
						event.preventDefault();
						handleChange(event.target);
					}}
					type="file"
				/>
				<BiPlusMedical className={styles.edit} />
			</>
		);
	};

	return (
		<div className={styles["account-header-section"]}>
			<img
				className={styles["banner-picture"]}
				src={data.bannerPicture}
				alt="ups"
			/>
			<main>{getContent()}</main>
			<div className={styles.details}>
				<div>
					<div className={styles.name}>
						{data.firstName} {data.lastName}
					</div>
					<div className={styles.row}>
						<HiOutlineMail />
						<span>{data.email}</span>
						<div className={styles.address}>
							<IoLocationOutline />
							{data.address}
						</div>
					</div>
				</div>
				<div className={styles.btns}>
					<Button>Share</Button>
					{/* <Button> Edit Profile</Button> */}
				</div>
			</div>
			{/* <div className={styles.links}>
				<img src={gmail} alt="not found" />
			</div> */}
		</div>
	);
};

export default AccountHeaderSection;
