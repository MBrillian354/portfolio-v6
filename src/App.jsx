
import About from './components/About';
import Navigation from './components/Navigation';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProvider';
import portfolioData from './data/portfolio.json';
import Header from './components/Header';

function App() {
  return (
    <ToastProvider>
      <CustomCursor
        gradientStops={12}
        size={1020}
        lightStartColor="#000"
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
              <Header title="Experiences" />
              <Experience
                experiences={portfolioData.experiences}
                internships={portfolioData.internships}
              />
              <Header title="Skills" />
              <Skills skills={portfolioData.skills} />
              <Header title="Education" />
              <Education
                education={portfolioData.education}
                certificates={portfolioData.certificates}
              />
              <Footer />
            </main>
          </div>
        </div>

        {/* Floating Dark Mode Toggle */}
        <DarkModeToggle floating={true} />
      </div>
    </ToastProvider>
  );
}

export default App;
