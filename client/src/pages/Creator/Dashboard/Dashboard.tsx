import { useAxios } from "hooks/useAxios";

import { DataView, DataViewLayoutType } from "primereact/dataview";
import { useState } from "react";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import { getCreatedLectures } from "../../../data/services/creator";
import { useFetchData } from "../../../hooks/useFetchData";
import "./Dashboard.scss";
import RenderGridItem from "./RenderGridItem";
import RenderHeader from "./RenderHeader";
import RenderListItem from "./RenderListItem";

const Dashboard = () => {
	const axios = useAxios();

	const [layout, setLayout] = useState<DataViewLayoutType>("list");

	const [sortOrder, setSortOrder] = useState(null);
	const [sortField, setSortField] = useState(null);

	const { data, isLoading, isError } = useFetchData(["dashboard"], () =>
		getCreatedLectures(axios)
	);

	const itemTemplate = (product: CreatedLectureModel, layout) => {
		if (!product) return;

		if (layout === "list") return RenderListItem(product);
		if (layout === "grid") return RenderGridItem(product);
	};

	const header = RenderHeader(layout, setLayout, setSortOrder, setSortField);

	return (
		<div className="dashboard">
			<DataView
				loading={isLoading}
				value={data}
				layout={layout}
				header={header}
				itemTemplate={itemTemplate}
				paginator
				rows={10}
				sortOrder={sortOrder}
				sortField={sortField}
			/>
		</div>
	);
};

export default Dashboard;
