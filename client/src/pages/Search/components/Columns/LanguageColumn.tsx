import Divider from "components/Divider/Divider";
import { LangParams } from "data/models/search/searchFilterModel";
import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { FilterColumnProps } from "./DurationColumn";

const LanguageColumn: FC<FilterColumnProps> = ({ values, setValues }) => {
	const handleClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		delete values["language"];
		setValues({ ...values });
	};
	const handleChange = (lang: LangParams) => {
		setValues({ ...values, language: lang });
	};

	return (
		<ul className="col">
			<li>Language</li>
			<Divider margin="0.5rem" />
			<li
				className={values?.language === "Romanian" ? "active" : ""}
				onClick={() => handleChange("Romanian")}
			>
				Romanian
				{values?.language === "Romanian" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.language === "English" ? "active" : ""}
				onClick={() => handleChange("English")}
			>
				English
				{values?.language === "English" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.language === "French" ? "active" : ""}
				onClick={() => handleChange("French")}
			>
				French
				{values?.language === "French" && <IoClose onClick={handleClose} />}
			</li>
		</ul>
	);
};

export default LanguageColumn;
