import ProjectArchive from "../components/ProjectArchive";
import portfolioData from "../data/portfolio.json";
import { useDocumentTitle } from "../utils/useDocumentTitle";

const ProjectArchivePage = () => {
	useDocumentTitle("Projects Archive");

	return <ProjectArchive projects={portfolioData.projects} />;
};

export default ProjectArchivePage;
