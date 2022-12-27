import React, { FC } from "react";
type Props = {
	margin?: string;
	color?: "#272727" | "#4b4b4b";
	borderWidth?: string;
};
const Divider: FC<Props> = ({
	color = "#4b4b4b",
	margin = "6px",
	borderWidth = "1px",
}) => {
	return (
		<hr
			style={{
				margin: `${margin} 0px`,
				border: `${borderWidth} solid ${color}`,
			}}
		/>
	);
};

export default Divider;
