import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const Header = ({ personalInfo }) => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'ABOUT', id: 'about' },
    { href: '#experience', label: 'EXPERIENCE', id: 'experience' },
    { href: '#skills', label: 'SKILLS', id: 'skills' },
  ];

  const activeItem = navItems.find(item => item.id === activeSection);

  return (
    <>
      {/* Mobile: Top sticky header */}
      <header className="sm:hidden bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-lg font-medium text-blue-600 dark:text-blue-400">
              {activeItem?.label || 'About'}
            </h1>
          </div>
        </div>
      </header>

      {/* Desktop: Left sidebar navigation */}
      <aside className="hidden sm:block sm:w-1/2 bg-white dark:bg-gray-900 sticky top-0 h-screen">
        {/* <div className="lg:pl-12 mxl:pl-32 2xl:pl-48 flex flex-col h-full">
         */}
        <div className="flex flex-col h-full pt-12">
          <div className="p-6">
            <h1 className="person-name">
              {personalInfo.name}
            </h1>
            <h2 className="person-title">
              {personalInfo.title}
            </h2>
            <p className="person-summary max-w-xs my-6">
              {personalInfo.description}
            </p>

            <nav className="flex flex-col items-start">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className='nav-link group'
                >
                  <span
                    className={`
                    inline-block align-middle mb-1 h-[1px] transition-all duration-150 ease-out mr-4
                    ${activeSection === item.id
                        ? 'w-14 bg-gray-500 dark:bg-white'
                        : 'w-8 bg-gray-300 dark:bg-gray-500'
                      }
                    group-hover:w-14 group-hover:dark:bg-white group-hover:bg-gray-500
                  `}
                  />

                  <span
                    className={` text-gray-400 ${activeSection === item.id
                      ? 'text-gray-600 dark:text-blue-100'
                      : 'dark:text-gray-500'
                      } group-hover:dark:text-blue-100 group-hover:text-gray-600 transition-colors duration-150 ease-out`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Dark mode toggle at bottom */}
          <div className="mt-auto py-12 px-8 flex justify-start gap-3 text-gray-700 dark:text-gray-400">
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-400 hover:text-gray-800 dark:text-gray-600 dark:hover:text-gray-200 transition-colors duration-150 ease-out"
            >
              <Icon icon="ant-design:github-outlined" width="28" height="28" />
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-400 hover:text-gray-800 dark:text-gray-600 dark:hover:text-gray-200 transition-colors duration-150 ease-out"
            >
              <Icon icon="uil:linkedin" width="28" height="28" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
