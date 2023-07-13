import qs from "query-string";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PRButton from "../../../components/PRButton/PRButton";
import { QueryFilterParams } from "../../../data/models/lectureModel";
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
			<header>
				<h3>Results</h3>
				<PRButton
					label="Filter"
					icon="pi pi-filter"
					className="surface-card"
					onClick={() => toogleSection(!isOpen)}
				/>
			</header>

			{isOpen && (
				<>
					<section className="grid">
						<DateColumn values={values} setValues={handleChange} />
						<RatingColumn values={values} setValues={handleChange} />
						<DurationColumn values={values} setValues={handleChange} />
						<LanguageColumn values={values} setValues={handleChange} />
					</section>
					<div className="flex justify-content-end gap-2">
						<PRButton
							label="Clear"
							icon="pi pi-times"
							className="bg-transparent"
							onClick={handleClear}
						/>
						<PRButton label="Apply" icon="pi pi-check" onClick={handleApply} />
					</div>
				</>
			)}
		</div>
	);
};

export default SearchFilterSection;
