import { FC } from "react";
import ActivityCard, { ConnectionItem } from "../ConnectionCard/ConnectionCard";
type Props = {
	value: ConnectionItem[];
};
const ConnectionSection: FC<Props> = ({ value }) => {
	return (
		<>
			{value.map((i, key) => (
				<ActivityCard
					key={key}
					date={i.date}
					location={i.location}
					device={i.device}
				/>
			))}
		</>
	);
};

export default ConnectionSection;
