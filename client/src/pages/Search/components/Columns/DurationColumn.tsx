import Divider from "components/Divider/Divider";
import {
	DurationParams,
	QueryFilterParams,
} from "data/models/search/searchFilterModel";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

export type FilterColumnProps = {
	values: QueryFilterParams;
	setValues: (e: QueryFilterParams) => void;
};

const DurationColumn: FC<FilterColumnProps> = ({ values, setValues }) => {
	const handleClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		delete values["duration"];
		setValues({ ...values });
	};
	const handleChange = (duration: DurationParams) => {
		setValues({ ...values, duration });
	};

	return (
		<ul className="col">
			<li>Video Duration</li>
			<Divider margin="0.5rem" />
			<li
				className={values?.duration === "4u" ? "active" : ""}
				onClick={() => handleChange("4u")}
			>
				Under 4 hours
				{values?.duration === "4u" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.duration === "4-16b" ? "active" : ""}
				onClick={() => handleChange("4-16b")}
			>
				4-16 hours
				{values?.duration === "4-16b" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.duration === "16-40b" ? "active" : ""}
				onClick={() => handleChange("16-40b")}
			>
				16-40 hours
				{values?.duration === "16-40b" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.duration === "40g" ? "active" : ""}
				onClick={() => handleChange("40g")}
			>
				Over 40 hours
				{values?.duration === "40g" && <IoClose onClick={handleClose} />}
			</li>
		</ul>
	);
};

export default DurationColumn;
