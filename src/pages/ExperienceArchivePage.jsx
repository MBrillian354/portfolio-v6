import ExperienceArchive from "../components/ExperienceArchive";
import portfolioData from "../data/portfolio.json";
import { useDocumentTitle } from "../utils/useDocumentTitle";

const ExperienceArchivePage = () => {
	useDocumentTitle("Experience Archive");

	return (
		<ExperienceArchive
			experiences={portfolioData.experiences}
			internships={portfolioData.internships}
		/>
	);
};

export default ExperienceArchivePage;
