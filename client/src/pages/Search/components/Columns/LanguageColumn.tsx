import Divider from "common/Divider/Divider";
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
				className={values?.language === "romanian" ? "active" : ""}
				onClick={() => handleChange("romanian")}
			>
				Romanian
				{values?.language === "romanian" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.language === "english" ? "active" : ""}
				onClick={() => handleChange("english")}
			>
				English
				{values?.language === "english" && <IoClose onClick={handleClose} />}
			</li>
			<li
				className={values?.language === "french" ? "active" : ""}
				onClick={() => handleChange("french")}
			>
				French
				{values?.language === "french" && <IoClose onClick={handleClose} />}
			</li>
		</ul>
	);
};

export default LanguageColumn;
