import { Image } from "primereact/image";
import { ChangeEvent, FC, ReactNode } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import "./ImageField.scss";

type ImageFieldProps = {
	isLoading: boolean;
	src: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	emptyIcon: ReactNode;
	isVideo?: boolean;
};

const ImageField: FC<ImageFieldProps> = ({
	isLoading,
	src,
	handleChange,
	emptyIcon,
	isVideo,
}) => {
	return (
		<div className="image-field">
			{isLoading ? (
				<Spinner className="flex-1 h-14rem" />
			) : (
				<>
					{src ? (
						isVideo ? (
							<div className="image-container">
								<video controls className="max-w-full" muted={false}>
									<source src={src} type="video/mp4" />
									<source src={src} type="video/webm" />
									Your browser does not support the video tag.
								</video>
							</div>
						) : (
							<Image
								className="image-container"
								src={src}
								alt="caption-icon"
								zoomSrc={src}
								preview
								imageClassName="caption"
							/>
						)
					) : (
						<div className="empty-image-container">{emptyIcon}</div>
					)}
				</>
			)}
			<div className="field-caption">
				<label htmlFor="caption">Upload an image</label>
				<input
					id="caption"
					type="file"
					onChange={handleChange}
					accept={isVideo ? "video/*" : "image/*"}
				/>
			</div>
		</div>
	);
};

export default ImageField;
