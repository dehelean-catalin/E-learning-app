import { convertSecondsToTime } from "../../../data/helpers";

const AccordionTabHeader = ({ label, children }) => {
	return (
		<header className="flex justify-content-between">
			<span>{label}</span>
			{!!children.length && (
				<div>
					{children.length} lectures -
					{convertSecondsToTime(
						children.reduce((a, b) => b.data.duration + a, 0)
					)}
				</div>
			)}
		</header>
	);
};
export default AccordionTabHeader;
