import Divider from "components/Divider/Divider";
import { RatingParams } from "data/models/search/searchFilterModel";
import { FC } from "react";
import { IoClose } from "react-icons/io5";
import "../FilterSection.scss";
import { FilterColumnProps } from "./DurationColumn";

const RatingColumn: FC<FilterColumnProps> = ({ values, setValues }) => {
	const handleClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		delete values["rating"];
		setValues({ ...values });
	};
	const handleChange = (rating: RatingParams) => {
		setValues({ ...values, rating });
	};

	return (
		<ul className="col">
			<li>Ratings</li>
			<Divider margin="0.5rem" />
			<li
				className={values?.rating === "9g" ? "active" : ""}
				onClick={() => handleChange("9g")}
			>
				9 stars & up
				{values?.rating === "9g" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.rating === "8-9b" ? "active" : ""}
				onClick={() => handleChange("8-9b")}
			>
				8 stars & up
				{values?.rating === "8-9b" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.rating === "8u" ? "active" : ""}
				onClick={() => handleChange("8u")}
			>
				Under 8 stars
				{values?.rating === "8u" && <IoClose onClick={handleClose} />}
			</li>
		</ul>
	);
};

export default RatingColumn;
