
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import DarkModeToggle from './components/DarkModeToggle';
import portfolioData from './data/portfolio.json';

function App() {
  return (
    <>
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
            <Header personalInfo={portfolioData.personalInfo} />
            <main className="sm:basis-3/5 bg-blue-950 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <Hero personalInfo={portfolioData.personalInfo} />
              <Experience
                experiences={portfolioData.experiences}
                internships={portfolioData.internships}
              />
              <Skills skills={portfolioData.skills} />
              <Education
                education={portfolioData.education}
                certificates={portfolioData.certificates}
              />

              {/* Footer */}
              <footer className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 py-12">
                <div className="max-w-4xl px-4">
                  <p className='text-sm'>Built with experimental technologies: React 19, Vite 7, and TailwindCSS v4.</p>
                  <p className='text-sm'>Heavily inspired by <a href="https://brittanychiang.com" target='_blank' className='intext-link'>Brittany Chiang</a>.</p>
                </div>
              </footer>
            </main>

          </div>
        </div>
        
        {/* Floating Dark Mode Toggle */}
        <DarkModeToggle floating={true} />
      </div>
    </>
  );
}

export default App;
