import { FieldArray, useFormikContext } from "formik";
import { CreatedLectureModel } from "../../../../data/models/createdLecture.model";
import SectionDivider from "./components/UploadLectureSection/SectionDivider";
import UploadLectureSection from "./components/UploadLectureSection/UploadLectureSection";

const UploadLecture = () => {
	const { values } = useFormikContext<CreatedLectureModel>();

	return (
		<>
			<h1>Upload Content</h1>
			<FieldArray
				name="content"
				render={(arrayHelpers) => (
					<>
						<SectionDivider
							arrayHelpers={arrayHelpers}
							isContentEmpty={!values.content.length}
						/>
						{values.content.map((content, index) => (
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
