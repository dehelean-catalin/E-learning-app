import {
	FileUpload,
	FileUploadHeaderTemplateOptions,
	FileUploadOptionsType,
	ItemTemplateOptions,
} from "primereact/fileupload";
import { FC } from "react";
import style from "./FileUploadInput.module.scss";
type Props = {
	valid?: boolean;
	onSelect: (e: any) => void;
};
const FileUploadInput: FC<Props> = ({ onSelect }) => {
	const chooseOptions: FileUploadOptionsType = {
		label: "Choose a picture",
		icon: "pi pi-fw pi-paperclip",
		className: style.choose,
	};

	const cancelOptions: FileUploadOptionsType = {
		iconOnly: true,
		icon: "pi pi-fw pi-times",
		className: style.close,
	};

	const customItemTemplate = (options: ItemTemplateOptions) => {
		return (
			<div className={style["item-template"]}>
				<i className="pi pi-image" />
				{options.fileNameElement}
			</div>
		);
	};
	const customHeaderTemplate = (options: FileUploadHeaderTemplateOptions) => {
		return (
			<div className={style["header-template"]}>
				{options.chooseButton}
				{options.cancelButton}
			</div>
		);
	};
	return (
		<div className={style.upload}>
			<FileUpload
				contentClassName={style["content-classname"]}
				itemTemplate={customItemTemplate}
				headerTemplate={customHeaderTemplate}
				progressBarTemplate={<></>}
				chooseOptions={chooseOptions}
				cancelOptions={cancelOptions}
				onSelect={(e) => onSelect(e.files[0])}
				onClear={() => onSelect(null)}
				accept="image/jpeg"
				maxFileSize={1000000}
			/>
		</div>
	);
};

export default FileUploadInput;
