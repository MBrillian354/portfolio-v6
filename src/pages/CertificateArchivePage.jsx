import CertificateArchive from "../components/CertificateArchive";
import portfolioData from "../data/portfolio.json";
import { useDocumentTitle } from "../utils/useDocumentTitle";

const CertificateArchivePage = () => {
	useDocumentTitle("Certificate Archive");

	return <CertificateArchive certificates={portfolioData.certificates} />;
};

export default CertificateArchivePage;
