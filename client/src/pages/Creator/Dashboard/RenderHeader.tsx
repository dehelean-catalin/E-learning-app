import { DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const RenderHeader = ({ layout, setLayout, setSortOrder, setSortField }) => {
	const [sortKey, setSortKey] = useState("!lastUpdate");
	const sortOptions = [
		{ label: "Latest", value: "!lastUpdate", icon: "pi pi-sort-numeric-down" },
		{ label: "Oldest", value: "lastUpdate", icon: "pi pi-sort-numeric-up" },
		{
			label: "Popular",
			value: "!enrolledUsers",
			icon: "pi pi-sort-numeric-down",
		},
		{
			label: "Least popular",
			value: "enrolledUsers",
			icon: "pi pi-sort-numeric-up",
		},
		{
			label: "A to Z",
			value: "publish.title",
			icon: "pi pi-sort-amount-up",
		},
		{
			label: "Z to A",
			value: "!publish.title",
			icon: "pi pi-sort-amount-down",
		},
		{
			label: "Public first",
			value: "!publish.status",
			icon: "pi pi-sort-alpha-down",
		},
		{
			label: "Draft first",
			value: "publish.status",
			icon: "pi pi-sort-alpha-up",
		},
	];

	const onSortChange = ({ value }) => {
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

	const itemTemplate = (option) => {
		return (
			<>
				<i className="pi pi-sort-alt mr-3" />
				{option.label}
			</>
		);
	};

	return (
		<div className="grid grid-nogutter">
			<div className="col-6" style={{ textAlign: "left" }}>
				<Dropdown
					className="w-12rem"
					options={sortOptions}
					value={sortKey}
					optionLabel="label"
					placeholder="Descending sort by date"
					onChange={onSortChange}
					valueTemplate={itemTemplate}
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
