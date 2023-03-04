import { InputSwitch } from "primereact/inputswitch";
import { FC, useState } from "react";
import styles from "./LinkedButton.module.scss";

type Props = {
	type: string;
	value?: any;
	onChange: () => void;
};

const LinkedButton: FC<Props> = ({ type, onChange }) => {
	const [value, setValue] = useState(false);
	const handleChange = () => {};
	return (
		<div className={styles["linked-button"]}>
			Link your account with to your {type} account
			<InputSwitch checked={value} onChange={(e) => setValue(e.target.value)} />
		</div>
	);
};

export default LinkedButton;
