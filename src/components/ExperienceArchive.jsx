import React, { useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ExperienceArchive = ({ experiences, internships, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  // Combine all experiences
  const allExperiences = [
    ...experiences.map(exp => ({ ...exp, type: exp.type || 'work' })),
    ...internships.map(exp => ({ ...exp, type: 'internship' }))
  ];

  // Sort by period (most recent first)
  const sortedExperiences = allExperiences.sort((a, b) => {
    if (a.period.includes('Present')) return -1;
    if (b.period.includes('Present')) return 1;
    return 0;
  });

  const typeColors = {
    work: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    project: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    internship: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 md:px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4 mb-8 bg-white dark:bg-gray-900 py-4">
          <button
            onClick={onClose}
            className="btn-action"
            aria-label="Close Experience Archive"
          >
            <Icon icon="material-symbols:arrow-back-rounded" width="20" height="20" />
            <span>M. Brillian</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">Experience Archive</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100 min-w-[140px]">
                  Period
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Title
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Company
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Type
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Tech Stack
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedExperiences.map((experience, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {experience.period}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 dark:text-blue-100 mb-1">
                      {experience.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                      {experience.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {experience.company}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge-type ${typeColors[experience.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                      {experience.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {experience.techStack?.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="badge-alt text-xs">
                          {tech}
                        </span>
                      ))}
                      {experience.techStack?.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{experience.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExperienceArchive;
