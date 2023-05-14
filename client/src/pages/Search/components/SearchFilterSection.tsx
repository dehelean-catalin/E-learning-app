import { QueryFilterParams } from "data/models/search/searchFilterModel";
import qs from "query-string";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PRButton from "../../../components/Forms/Buttons/PRButton/PRButton";
import DateColumn from "./Columns/DateColumn";
import DurationColumn from "./Columns/DurationColumn";
import LanguageColumn from "./Columns/LanguageColumn";
import RatingColumn from "./Columns/RatingColumn";
import "./FilterSection.scss";

const SearchFilterSection = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryParam = qs.parse(search) as QueryFilterParams;

	const [isOpen, toogleSection] = useState(false);
	const [values, setValues] = useState<QueryFilterParams>(queryParam);

	const handleChange = (e: QueryFilterParams) => {
		setValues(e);
	};

	const handleClear = () => {
		delete values["duration"];
		delete values["rating"];
		delete values["language"];
		delete values["date"];
		setValues({ ...values });
	};

	const handleApply = () => {
		navigate(`/search?${qs.stringify(values)}`);
		toogleSection(false);
	};

	return (
		<div className="search-filter-section">
			<PRButton
				label="Filter"
				icon="pi pi-filter"
				onClick={() => toogleSection(!isOpen)}
			/>

			{isOpen && (
				<>
					<section className="grid">
						<DateColumn values={values} setValues={handleChange} />
						<RatingColumn values={values} setValues={handleChange} />
						<DurationColumn values={values} setValues={handleChange} />
						<LanguageColumn values={values} setValues={handleChange} />
					</section>
					<div className="flex justify-content-end gap-2">
						<PRButton onClick={handleClear}>Clear</PRButton>
						<PRButton onClick={handleApply}>Apply</PRButton>
					</div>
				</>
			)}
		</div>
	);
};

export default SearchFilterSection;
