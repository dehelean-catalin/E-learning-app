import { FC } from "react";
import { useLocation } from "react-router";
import { filters, ICategory } from "../../../data/models/lectureModel";
import styles from "./FilterList.module.scss";
import filterService from "./filterService";

type Props = {
	onFilterChange: (filter: ICategory) => void;
};
const FilterList: FC<Props> = ({ onFilterChange }) => {
	const search = useLocation().search;
	const category = new URLSearchParams(search).get("category");

	const getClassName = (filter: ICategory) => {
		if (filter === category) {
			return styles["active-category"];
		}
		return styles.category;
	};

	return (
		<div className={styles["filer-section"]}>
			{filters.map((filter, key) => (
				<div
					key={key}
					className={getClassName(filter)}
					onClick={() => onFilterChange(filter)}
				>
					{filterService.getContent(filter)}
				</div>
			))}
		</div>
	);
};

export default FilterList;
