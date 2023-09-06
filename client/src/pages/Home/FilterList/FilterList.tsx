import { Category } from "data/models/creatorModel";
import { FC } from "react";
import { useLocation } from "react-router";
import "./FilterList.scss";

type Props = {
	onFilterChange: (filter: Category) => void;
};
const FilterList: FC<Props> = ({ onFilterChange }) => {
	const search = useLocation().search;
	const category = new URLSearchParams(search).get("category");

	const getClassName = (filter: Category) => {
		if (filter === category) {
			return "active-category";
		}
		return "category";
	};

	return (
		<div className="filer-section">
			{Object.values(Category).map((category, key) => (
				<div
					key={key}
					className={getClassName(category)}
					onClick={() => onFilterChange(category)}
				>
					{category}
				</div>
			))}
		</div>
	);
};

export default FilterList;
