import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showVideoDialog } from "../../../../data/redux/dialogReducer";

const Header: FC<{ caption: string; promoVideo; title }> = ({
	caption,
	promoVideo,
	title,
}) => {
	const dispatch = useDispatch();
	return (
		<header
			className="caption-container"
			onClick={() => dispatch(showVideoDialog({ src: promoVideo, title }))}
		>
			<img className="caption" src={caption} alt="not found" />
			<div className="preview-wrapper">
				<FaPlay className="play-icon" />
				<p>Preview this course</p>
			</div>
		</header>
	);
};

export default Header;
