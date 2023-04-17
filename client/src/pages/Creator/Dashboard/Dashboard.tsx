import CreatedLectureCard from "components/Cards/CreatedLectureCard/CreatedLectureCard";
import { useAxios } from "hooks/useAxios";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import "./Dashboard.scss";

import { NavLink } from "react-router-dom";
import Spinner from "../../../common/Spinner/Spinner";
import Empty from "../../../components/Empty/Empty";
import { getCreatedLectures } from "../../../data/services/creator";
import { getCreatedLecturesLength } from "../../../data/services/creator/_getCreatedLecturesLength.service";
import { useFetchData } from "../../../hooks/useFetchData";
import NotFoundError from "../../NotFound/NotFoundError/NotFoundError";

const Dashboard = () => {
	const axios = useAxios();
	const [lectureId, setLectureId] = useState(null);
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState("initial");

	const { data: createdLecturesLength } = useFetchData("items", () =>
		getCreatedLecturesLength(axios)
	);

	const { data, isLoading, isError } = useFetchData(
		["dashboard", createdLecturesLength, page, direction],
		() => getCreatedLectures(axios, lectureId, direction, createdLecturesLength)
	);

	const onPageChange = (e) => {
		if (e.first > page) {
			setPage(e.first);
			setLectureId(data[data.length - 1].id);
			setDirection("forward");
		}
		if (e.first < page && e.first !== 0) {
			setPage(e.first);
			setLectureId(data[0].id);
			setDirection("backward");
		}
		if (e.first === 0) {
			setPage(e.first);
			setDirection("initial");
		}
		if (e.page === Math.ceil(createdLecturesLength / 4) - 1) {
			setDirection("final");
		}
	};

	if (isLoading) return <Spinner />;

	if (isError) return <NotFoundError />;

	if (!data.length)
		return (
			<Empty>
				<strong>Create a new lecture</strong>
				<p>
					Looks like you didn't create any lecture yet
					<br />
					Press bellow button and try to create a lecture
				</p>
				<NavLink to="/create">Create</NavLink>
			</Empty>
		);

	return (
		<div className="dashboard">
			<div className="wrapper">
				{data?.map((lecture, key) => (
					<CreatedLectureCard key={key} data={lecture} />
				))}
			</div>
			<Paginator
				first={page}
				rows={4}
				className="mt-3 justify-content-center"
				totalRecords={createdLecturesLength}
				onPageChange={onPageChange}
				template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			></Paginator>
		</div>
	);
};

export default Dashboard;

// const Dashboard = () => {
// 	const axios = useAxios();
// 	const [lectureId, setLectureId] = useState(null);
// 	const [page, setPage] = useState(0);
// 	const [direction, setDirection] = useState("initial");
// 	const [layout, setLayout] = useState<DataViewLayoutType>("grid");
// 	const [sortKey, setSortKey] = useState(null);
// 	const [sortOrder, setSortOrder] = useState(null);
// 	const [sortField, setSortField] = useState(null);
// 	const sortOptions = [
// 		{ label: "Descending sort by date", value: "!lastUpdate" },
// 		{ label: "Ascending sort by date", value: "lastUpdate" },
// 	];

// 	const { data: createdLecturesLength } = useFetchData("items", () =>
// 		getCreatedLecturesLength(axios)
// 	);

// 	const { data, isLoading, isError } = useFetchData(
// 		["dashboard", createdLecturesLength, page, direction],
// 		() => getCreatedLectures(axios, lectureId, direction, createdLecturesLength)
// 	);

// 	const onSortChange = (event) => {
// 		const value = event.value;
// 		if (value.indexOf("!") === 0) {
// 			setSortOrder(-1);
// 			setSortField(value.substring(1, value.length));
// 			setSortKey(value);
// 		} else {
// 			setSortOrder(1);
// 			setSortField(value);
// 			setSortKey(value);
// 		}
// 	};

// 	const renderListItem = (data: CreatedLectureModel) => {
// 		return (
// 			<div className="col-12">
// 				<div className="product-list-item">
// 					<img src={data.publish.caption} alt="caption" />
// 					<div className="product-list-detail">
// 						<div className="product-name">{data.publish.title}</div>
// 						<div className="product-description">
// 							{data.publish.description}
// 						</div>
// 						<Rating
// 							value={data?.reviews?.length}
// 							readOnly
// 							cancel={false}
// 						></Rating>
// 						<i className="pi pi-tag product-category-icon"></i>
// 						<span className="product-category">{data.publish.category}</span>
// 					</div>
// 					<div className="product-list-action">
// 						<span className="product-price">
// 							{getRelativeTime(data.lastUpdate)}
// 						</span>
// 						<Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
// 						<span>{data.publish.status}</span>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	};

// 	const renderGridItem = (data: CreatedLectureModel) => {
// 		return (
// 			<div className="col-12 md:col-4">
// 				<div className="product-grid-item card">
// 					<div className="product-grid-item-top">
// 						<div>
// 							<i className="pi pi-tag product-category-icon"></i>
// 							<span className="product-category">{data.publish.category}</span>
// 						</div>
// 						<span>{data.publish.status}</span>
// 					</div>
// 					<div className="product-grid-item-content">
// 						<img src={data.publish.caption} alt={"caption"} />
// 						<div className="product-name">{data.publish.title}</div>
// 						<div className="product-description">
// 							{data.publish.description}
// 						</div>
// 						<Rating
// 							value={data?.reviews?.length}
// 							readOnly
// 							cancel={false}
// 						></Rating>
// 					</div>
// 					<div className="product-grid-item-bottom">
// 						<span className="product-price">
// 							{getRelativeTime(data.lastUpdate)}
// 						</span>
// 						<Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	};

// 	const itemTemplate = (product, layout) => {
// 		if (!product) {
// 			return;
// 		}

// 		if (layout === "list") return renderListItem(product);
// 		else if (layout === "grid") return renderGridItem(product);
// 	};

// 	const renderHeader = () => {
// 		return (
// 			<div className="grid grid-nogutter">
// 				<div className="col-6" style={{ textAlign: "left" }}>
// 					<Dropdown
// 						options={sortOptions}
// 						value={sortKey}
// 						optionLabel="label"
// 						placeholder="Sort By Price"
// 						onChange={onSortChange}
// 					/>
// 				</div>
// 				{/* <div className="col-6" style={{ textAlign: "right" }}>
// 					<DataViewLayoutOptions
// 						layout={layout}
// 						onChange={(e) => setLayout(e.value)}
// 					/>
// 				</div> */}
// 			</div>
// 		);
// 	};

// 	const header = renderHeader();

// 	if (isLoading) return <></>;

// 	return (
// 		<div className="dataview-demo">
// 			<div className="card">
// 				<DataView
// 					value={data}
// 					layout={layout}
// 					header={header}
// 					itemTemplate={itemTemplate}
// 					paginator
// 					rows={3}
// 					sortOrder={sortOrder}
// 					sortField={sortField}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;
