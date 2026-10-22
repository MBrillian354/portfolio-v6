import About from "../components/About";
import Navigation from "../components/Navigation";
import Experience from "../components/Experience";
import CurrentTechnologies from "../components/CurrentTechnologies";
import Certificates from "../components/Certificates";
import Projects from "../components/Projects";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import portfolioData from "../data/portfolio.json";
import { useDocumentTitle } from "../utils/useDocumentTitle";

const HomePage = () => {
	useDocumentTitle();

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-6xl">
				<div className="sm:flex">
					<aside className="sticky top-0 hidden h-screen overflow-y-auto bg-white sm:block sm:w-1/2 dark:bg-gray-900">
						<div className="flex h-full min-h-0 flex-col pt-8 md:pt-12">
							<div className="relative min-h-0 flex-1 overflow-y-auto">
								<About personalInfo={portfolioData.personalInfo} />
								<Navigation />
							</div>
						</div>
					</aside>
					<main className="bg-white pt-8 text-gray-900 sm:basis-3/5 md:pt-12 dark:bg-gray-900 dark:text-gray-100">
						<div className="sm:hidden">
							<About personalInfo={portfolioData.personalInfo} />
						</div>
						<Hero personalInfo={portfolioData.personalInfo} />
						<Header title="Current Technologies" />
						<CurrentTechnologies
							technologies={portfolioData.currentTechnologies}
						/>
						<Header title="Experiences" />
						<Experience
							experiences={portfolioData.experiences}
							internships={portfolioData.internships}
							showArchiveButton={true}
						/>
						<Header title="Projects" />
						<Projects
							projects={portfolioData.projects}
							showArchiveButton={true}
						/>
						<Header title="Certificates" />
						<Certificates
							certificates={portfolioData.certificates}
							showArchiveButton={true}
						/>
						{/*
              <Header title="Skills" /> 
              <Skills skills={portfolioData.skills} />
              <Header title="Education" />
              <Education education={portfolioData.education} /> 
            */}
						<Footer />
					</main>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
