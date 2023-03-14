import Divider from "common/Divider/Divider";
import { DateParams } from "data/models/search/searchFilterModel";
import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { FilterColumnProps } from "./DurationColumn";

const DateColumn: FC<FilterColumnProps> = ({ values, setValues }) => {
	const handleClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		delete values["date"];
		setValues({ ...values });
	};
	const handleChange = (date: DateParams) => {
		setValues({ ...values, date });
	};

	return (
		<ul className="col">
			<li>Upload Date</li>
			<Divider margin="0.5rem" />
			<li
				className={values?.date === "lh" ? "active" : ""}
				onClick={() => handleChange("lh")}
			>
				Last hour
				{values?.date === "lh" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.date === "td" ? "active" : ""}
				onClick={() => handleChange("td")}
			>
				Today
				{values?.date === "td" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.date === "lw" ? "active" : ""}
				onClick={() => handleChange("lw")}
			>
				Last week
				{values?.date === "lw" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.date === "lm" ? "active" : ""}
				onClick={() => handleChange("lm")}
			>
				Last month
				{values?.date === "lm" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.date === "ly" ? "active" : ""}
				onClick={() => handleChange("ly")}
			>
				Last year
				{values?.date === "ly" && <IoClose onClick={handleClose} />}
			</li>
		</ul>
	);
};

export default DateColumn;
