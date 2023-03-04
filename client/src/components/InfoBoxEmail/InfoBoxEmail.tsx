import { FC } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router";
import "./InfoBoxEmail.scss";

type Props = {
	link: string;
	email: string;
};

const InfoBoxEmail: FC<Props> = ({ email, link }) => {
	const navigate = useNavigate();
	return (
		<div className="info-box-email">
			<MdOutlineMarkEmailRead />
			<strong className="title">Check your email address</strong>
			<div>
				A {link} was send to <strong>{email}</strong>
				<br />
				Press the button bellow to redirect to your email
			</div>
			<a
				href="https://mail.google.com"
				target="_blank"
				rel="noreferrer"
				onClick={() => navigate("/login")}
			>
				Check your email
			</a>
		</div>
	);
};

export default InfoBoxEmail;
