import { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { ICategory } from "../../../resources/models/lectures";
import styles from "./FilterList.module.scss";
import filterService from "./filterService";

const FILTERS = [
	ICategory.ALL,
	ICategory.UTCN,
	ICategory.Design,
	ICategory.DataSience,
	ICategory.Web,
	ICategory.Electronics,
	ICategory.Arhitecture,
	ICategory.History,
	ICategory.Psychology,
	ICategory.Policy,
];

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
			{FILTERS.map((filter, key) => (
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
