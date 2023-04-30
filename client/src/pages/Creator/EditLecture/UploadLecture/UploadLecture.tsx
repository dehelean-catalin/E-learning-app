import { FieldArray, useFormikContext } from "formik";
import { CreatedLectureModel } from "../../../../data/models/createdLecture.model";
import NewSectionTag from "./components/NewSectionTag";
import UploadLectureSection from "./components/UploadLectureSection/UploadLectureSection";

const UploadLecture = () => {
	const {
		values: { content },
	} = useFormikContext<CreatedLectureModel>();

	return (
		<>
			<h1>Upload Content</h1>
			<FieldArray
				name="content"
				render={(arrayHelpers) => (
					<>
						<NewSectionTag
							arrayHelpers={arrayHelpers}
							isContentEmpty={!content.length}
						/>
						{content.map((content, index) => (
							<UploadLectureSection
								key={index}
								index={index}
								content={content}
								arrayHelpers={arrayHelpers}
							/>
						))}
					</>
				)}
			/>
		</>
	);
};

export default UploadLecture;
