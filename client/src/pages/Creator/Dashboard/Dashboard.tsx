import { CreatedLectureModel } from "data/models/creatorModel";
import { getCreatedLectures } from "data/services/creatorService";
import { useAxios } from "hooks/useAxios";
import { useFetchData } from "hooks/useFetchData";
import { DataView, DataViewLayoutType } from "primereact/dataview";
import { useState } from "react";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";
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

		if (layout === "list") return <RenderListItem value={product} />;
		if (layout === "grid") return <RenderGridItem value={product} />;
	};

	const header = (
		<RenderHeader
			layout={layout}
			setLayout={setLayout}
			setSortOrder={setSortOrder}
			setSortField={setSortField}
		/>
	);

	if (isError) return <NotFoundError></NotFoundError>;

	return (
		<DataView
			className="dashboard"
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
	);
};

export default Dashboard;
