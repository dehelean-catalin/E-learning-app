import { BiSlideshow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const CreatorSideBar = () => {
	return (
		<nav className="side-bar">
			<NavLink
				to="/creator/created-lectures"
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				<span>
					<BiSlideshow />
					Lectures
				</span>
			</NavLink>
		</nav>
	);
};

export default CreatorSideBar;
