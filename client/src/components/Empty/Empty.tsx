import { FC, PropsWithChildren } from "react";
import image from "../../layout/images/empty.png";
import "./Empty.scss";

const Empty: FC<PropsWithChildren> = ({ children }) => {
	return (
		<article className="empty-page">
			<img src={image} alt="not found" />
			{children}
		</article>
	);
};

export default Empty;
