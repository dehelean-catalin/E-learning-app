import { Divider } from "primereact/divider";
import { FC } from "react";

const PRPasswordFooter: FC<{ value: string }> = ({ value }) => {
	return (
		<>
			<Divider />
			<p className="my-2">Suggestions</p>
			<ul className="pl-2 mt-0 line-height-3 list-none">
				<li
					className={
						value.match(/[A-Z]/) && value.match(/[a-z]/) ? "text-primary" : ""
					}
				>
					<i
						className={`${
							value.match(/[A-Z]/) && value.match(/[a-z]/)
								? "pi pi-check-circle"
								: "pi pi-circle-off"
						} mr-2`}
					/>
					At least one lowercase, one uppercase
				</li>
				<li
					className={
						value.match(/[!@#$%^&*()\-=_+{}[\]:;'"|\\<>,.?/~`]/) &&
						value.match(/[0-9]/)
							? "text-primary"
							: ""
					}
				>
					<i
						className={`${
							value.match(/[!@#$%^&*()\-=_+{}[\]:;'"|\\<>,.?/~`]/) &&
							value.match(/[0-9]/)
								? "pi pi-check-circle"
								: "pi pi-circle-off"
						} mr-2`}
					/>
					At least one numeric, one symbol
				</li>
				<li className={value.length >= 8 ? "text-primary" : ""}>
					<i
						className={`${
							value.length >= 8 ? "pi pi-check-circle" : "pi pi-circle-off"
						} mr-2`}
					/>
					Minimum 8 characters
				</li>
			</ul>
		</>
	);
};

export default PRPasswordFooter;
