import { InputText } from "primereact/inputtext";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import "./InputTextSearch.scss";

export const InputTextSearch = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("searchQuery");
	const [value, setValue] = useState<string>(searchQuery ?? "");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !!value.length) {
			navigate(`/search?searchQuery=${value}`);
		}
	};

	return (
		<span className="p-input-icon-left search-field">
			<i className="pi pi-search" />
			<InputText
				value={value}
				placeholder="Search"
				onKeyDown={handlekeydown}
				onChange={handleChange}
				className="input-search"
			/>
		</span>
	);
};
