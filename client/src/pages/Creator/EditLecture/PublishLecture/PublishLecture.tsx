import {
	Category,
	CreatedLectureModel,
	Language,
	Level,
} from "data/models/createdLecture.model";
import { Field, FormikProps, useFormikContext } from "formik";
import { ChangeEvent } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { useMutation } from "react-query";
import { useOutletContext } from "react-router";
import { useAxios } from "../../../../hooks/useAxios";
import ImageField from "./ImageField";

const PublishLecture = () => {
	const axios = useAxios();
	const { setFieldValue } =
		useOutletContext<FormikProps<CreatedLectureModel>>();
	const { values } = useFormikContext<CreatedLectureModel>();

	const { mutate: handleCaptionChange, isLoading: isCaptionLoading } =
		useMutation((e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();

			if (!e.target.files?.length) return;
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);

			return axios
				.post(`caption/${values.id}`, formData)
				.then((res) => setFieldValue("publish.caption", res.data));
		});

	const { mutate: handleVideoChange, isLoading: isVideoLoading } = useMutation(
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (!e.target.files?.length) return;

			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);

			return axios
				.post(`promoVideo/${values.id}`, formData)
				.then((res) => setFieldValue("publish.promoVideo", res.data));
		}
	);

	return (
		<>
			<h1>Publish your lecture</h1>
			<label className="my-2" htmlFor="publish.title">
				Title
			</label>
			<Field name={`publish.title`} placeholder="Enter the lecture title" />
			<label className="my-2" htmlFor="publish.description">
				Description
			</label>
			<Field
				as="textarea"
				rows="10"
				name={`publish.description`}
				placeholder="Enter a description for your lecture"
			/>
			<div className="grid">
				<div className="col-4 flex flex-column">
					<label className="my-2" htmlFor="publish.category">
						Category
					</label>
					<Field as="select" name="publish.category">
						{Object.values(Category).map((o) => (
							<option key={o} value={o}>
								{o}
							</option>
						))}
					</Field>
				</div>
				<div className=" col-4 flex flex-column">
					<label className="my-2" htmlFor="publish.language">
						Language
					</label>
					<Field as="select" name="publish.language">
						{Object.values(Language).map((o) => (
							<option key={o} value={o}>
								{o}
							</option>
						))}
					</Field>
				</div>
				<div className="col-4 flex flex-column">
					<label className="my-2" htmlFor="publish.level">
						Level
					</label>
					<Field as="select" name="publish.level">
						{Object.values(Level).map((o) => (
							<option key={o} value={o}>
								{o}
							</option>
						))}
					</Field>
				</div>
			</div>

			<h4 className="my-2">Lecture caption</h4>

			<ImageField
				isLoading={isCaptionLoading}
				src={values.publish?.caption}
				handleChange={handleCaptionChange}
				emptyIcon={
					<IoMdImages size={75} className="text-color-secondary m-auto" />
				}
			/>

			<h4 className="mb-2 mt-4">Promo video</h4>
			<ImageField
				isLoading={isVideoLoading}
				src={values.publish?.promoVideo}
				handleChange={handleVideoChange}
				emptyIcon={
					<FaPhotoVideo size={75} className="text-color-secondary m-auto" />
				}
				isVideo
			/>
		</>
	);
};

export default PublishLecture;
