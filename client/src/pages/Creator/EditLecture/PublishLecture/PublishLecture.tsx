import {
	Category,
	CreatedLectureModel,
	Language,
	Level,
} from "data/models/createdLecture.model";
import { Field, FormikProps, useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";
import { useOutletContext } from "react-router";
import { updatePromoVideo } from "../../../../data/services/creator";
import { useAxios } from "../../../../hooks/useAxios";

const PublishLecture = () => {
	const axios = useAxios();
	const { setFieldValue } =
		useOutletContext<FormikProps<CreatedLectureModel>>();
	const { values } = useFormikContext<CreatedLectureModel>();
	const [videoUrl, setVideoUrl] = useState(values.publish.promoVideo);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (e.target.files?.length) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);

			await axios
				.post(`caption/${values.id}`, formData)
				.then((res) => setFieldValue("publish.caption", res.data));
		}
	};

	const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (e.target.files?.length) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			setVideoUrl(URL.createObjectURL(e.target.files[0]));
			updatePromoVideo(axios, values.id, formData);
		}
	};

	return (
		<>
			<h1>Publish your lecture</h1>
			<label htmlFor="publish.title">Title</label>
			<Field name={`publish.title`} placeholder="Enter the lecture title" />
			<label htmlFor="publish.description">Description</label>
			<Field
				as="textarea"
				rows="3"
				name={`publish.description`}
				placeholder="Enter a description for your lecture"
			/>
			<label htmlFor="publish.category">Category</label>
			<Field as="select" name="publish.category">
				{Object.keys(Category).map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</Field>
			<label htmlFor="publish.language">Language</label>
			<Field as="select" name="publish.language">
				{Object.keys(Language).map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</Field>
			<label htmlFor="publish.level">Level</label>
			<Field as="select" name="publish.level">
				{Object.keys(Level).map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</Field>
			Lecture cover
			<div className="field">
				<img
					className="caption"
					src={values.publish.caption}
					alt="caption-icon"
				/>
				<div className="field-input">
					<label htmlFor="caption">Upload an image</label>
					<input id="caption" type="file" onChange={handleChange} />
				</div>
			</div>
			Promotional video
			<div className="field">
				{videoUrl && (
					<video controls width="500">
						<source src={videoUrl} type="video/mp4" />
						<source src={videoUrl} type="video/webm" />
						Your browser does not support the video tag.
					</video>
				)}
				<div className="field-input">
					<label htmlFor="promo-video">Upload a video</label>
					<input
						id="promo-video"
						type="file"
						onChange={handleVideoChange}
						accept="video/*"
					/>
				</div>
			</div>
		</>
	);
};

export default PublishLecture;
