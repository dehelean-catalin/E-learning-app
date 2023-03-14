import Button from "common/Button/Button";
import { QueryFilterParams } from "data/models/search/searchFilterModel";
import qs from "query-string";
import { useState } from "react";
import { HiFilter } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
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
			<Button onClick={() => toogleSection(!isOpen)}>
				Filter <HiFilter />
			</Button>

			{isOpen && (
				<>
					<section className="grid">
						<DateColumn values={values} setValues={handleChange} />
						<RatingColumn values={values} setValues={handleChange} />
						<DurationColumn values={values} setValues={handleChange} />
						<LanguageColumn values={values} setValues={handleChange} />
					</section>
					<div className="flex justify-content-end gap-2">
						<Button onClick={handleClear}>Clear</Button>
						<Button onClick={handleApply}>Apply</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default SearchFilterSection;
