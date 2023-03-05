import { InputText } from "primereact/inputtext";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";
import "./InputTextSearch.scss";

const InputTextSearch = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handlekeydown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !!value.length) {
			navigate(`/search?search_query=${value}`);
		}
	};

	return (
		<span className="p-input-icon-left">
			<i className="pi pi-search" />
			<InputText
				className="input-search"
				value={value}
				placeholder="Search"
				onKeyDown={handlekeydown}
				onChange={handleChange}
			/>
		</span>
	);
};

export default InputTextSearch;
