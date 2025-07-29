import { useState } from 'react';
import About from './components/About';
import Navigation from './components/Navigation';
import Experience from './components/Experience';
import ExperienceArchive from './components/ExperienceArchive';
import Skills from './components/Skills';
import CurrentTechnologies from './components/CurrentTechnologies';
import Education from './components/Education';
import Certificates from './components/Certificates';
import CertificateArchive from './components/CertificateArchive';
import Projects from './components/Projects';
import ProjectArchive from './components/ProjectArchive';
import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProvider';
import portfolioData from './data/portfolio.json';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const [currentView, setCurrentView] = useState('main');

  const showExperienceArchive = () => setCurrentView('experience-archive');
  const showCertificateArchive = () => setCurrentView('certificate-archive');
  const showProjectArchive = () => setCurrentView('project-archive');
  const showMain = () => setCurrentView('main');
  return (
    <ToastProvider>
      <CustomCursor
        gradientStops={12}
        size={1020}
        lightStartColor="#fff"
        lightEndColor="#8cb4ff"
        darkStartColor="#101828"
        darkEndColor="#9abbfc"
        gradientDirection="in-to-out"
        hoverScale={1}
        fadeStops={[15, 15, 45]}
        opacityStops={[0.15, 0.1, 0.02, 0.000001]}
        hoverOpacityBoost={0}
        transitionDuration={0}
      />

      {/* Archive Views */}
      {currentView === 'experience-archive' && (
        <>
          <ExperienceArchive
            experiences={portfolioData.experiences}
            internships={portfolioData.internships}
            onClose={showMain}
          />
          <DarkModeToggle floating={true} />
        </>
      )}

      {currentView === 'certificate-archive' && (
        <>
          <CertificateArchive
            certificates={portfolioData.certificates}
            onClose={showMain}
          />
          <DarkModeToggle floating={true} />
        </>
      )}

      {currentView === 'project-archive' && (
        <>
          <ProjectArchive
            projects={portfolioData.projects}
            onClose={showMain}
          />
          <DarkModeToggle floating={true} />
        </>
      )}

      {/* Main View */}
      {currentView === 'main' && (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <div className='max-w-6xl mx-auto'>
            <div className="sm:flex">
              <aside className="hidden sm:block sm:w-1/2 bg-white dark:bg-gray-900 sticky top-0 h-screen overflow-y-auto">
                <div className="flex flex-col h-full pt-12 min-h-0">
                  <div className="flex-1 min-h-0 overflow-y-auto relative">
                    <About personalInfo={portfolioData.personalInfo} />
                    <Navigation />
                  </div>
                </div>
              </aside>
              <main className="sm:basis-3/5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-12">
                <div className="sm:hidden">
                  <About personalInfo={portfolioData.personalInfo} />
                </div>
                <Hero personalInfo={portfolioData.personalInfo} />
                <Header title="Current Technologies" />
                <CurrentTechnologies technologies={portfolioData.currentTechnologies} />
                <Header title="Experiences" />
                <Experience
                  experiences={portfolioData.experiences}
                  internships={portfolioData.internships}
                  showArchiveButton={true}
                  onShowArchive={showExperienceArchive}
                />
                <Header title="Projects" />
                <Projects
                  projects={portfolioData.projects}
                  showArchiveButton={true}
                  onShowArchive={showProjectArchive}
                />
                <Header title="Certificates" />
                <Certificates
                  certificates={portfolioData.certificates}
                  showArchiveButton={true}
                  onShowArchive={showCertificateArchive}
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

          {/* Floating Dark Mode Toggle */}
          <DarkModeToggle floating={true} />
        </div>
      )}
    </ToastProvider>
  );
}

export default App;
