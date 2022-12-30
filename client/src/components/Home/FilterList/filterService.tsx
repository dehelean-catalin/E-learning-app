import { ICategory } from "../../../resources/models/lectureModel";

const filterService = {
	getContent: (category: ICategory | string) => {
		if (category === ICategory.ALL) {
			return "All";
		}
		if (category === ICategory.Design) {
			return "Design";
		}
		if (category === ICategory.UTCN) {
			return "UTCN";
		}
		if (category === ICategory.DataSience) {
			return "Data Sience";
		}
		if (category === ICategory.Arhitecture) {
			return "Arhitecture";
		}
		if (category === ICategory.Policy) {
			return "Policy";
		}
		if (category === ICategory.History) {
			return "History";
		}
		if (category === ICategory.Psychology) {
			return "Psychology";
		}
		if (category === ICategory.Electronics) {
			return "Electronics";
		}
		if (category === ICategory.Web) {
			return "Web development";
		}

		return;
	},
};

export default filterService;
