import { DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const RenderHeader = (layout, setLayout, setSortOrder, setSortField) => {
	const [sortKey, setSortKey] = useState(null);
	const sortOptions = [
		{ label: "Descending sort by date", value: "!lastUpdate" },
		{ label: "Ascending sort by date", value: "lastUpdate" },
		{ label: "Descending sort by title", value: "!publish.title" },
		{ label: "Ascending sort by publish.title", value: "publish.title" },
	];
	const onSortChange = (event) => {
		const value = event.value;
		if (value.indexOf("!") === 0) {
			setSortOrder(-1);
			setSortField(value.substring(1, value.length));
			setSortKey(value);
		} else {
			setSortOrder(1);
			setSortField(value);
			setSortKey(value);
		}
	};
	return (
		<div className="grid grid-nogutter">
			<div className="col-6" style={{ textAlign: "left" }}>
				<Dropdown
					options={sortOptions}
					value={sortKey}
					optionLabel="label"
					placeholder="Sort By last update"
					onChange={onSortChange}
				/>
			</div>
			<div className="col-6" style={{ textAlign: "right" }}>
				<DataViewLayoutOptions
					layout={layout}
					onChange={(e) => setLayout(e.value)}
				/>
			</div>
		</div>
	);
};

export default RenderHeader;
