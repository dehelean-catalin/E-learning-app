import { Category } from "data/models/createdLecture.model";
import { FC } from "react";
import { useLocation } from "react-router";
import styles from "./FilterList.module.scss";

type Props = {
	onFilterChange: (filter: Category) => void;
};
const FilterList: FC<Props> = ({ onFilterChange }) => {
	const search = useLocation().search;
	const category = new URLSearchParams(search).get("category");

	const getClassName = (filter: Category) => {
		if (filter === category) {
			return styles["active-category"];
		}
		return styles.category;
	};

	return (
		<div className={styles["filer-section"]}>
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
