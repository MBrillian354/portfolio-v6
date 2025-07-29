import React, { useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ProjectArchive = ({ projects, onClose }) => {
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
  // Sort by period (most recent first)
  const sortedProjects = projects.sort((a, b) => {
    if (a.period.includes('Present')) return -1;
    if (b.period.includes('Present')) return 1;
    return 0;
  });

  const statusColors = {
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="section-container py-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4 mb-8 bg-white dark:bg-gray-900 py-4">
          <button
            onClick={onClose}
            className="btn-action"
            aria-label="Close Projects Archive"
          >
            <Icon icon="material-symbols:arrow-back-rounded" width="20" height="20" />
            <span>M. Brillian</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">Projects Archive</h1>
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
                  Project
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Company
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Built With
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100 min-w-[100px]">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100 min-w-[100px]">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.period}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 dark:text-blue-100 mb-1">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                      {project.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {project.company}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.techStack?.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="badge-alt text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.techStack?.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge-type ${statusColors[project.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                      {project.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors inline-block"
                        aria-label={`View ${project.title} project`}
                      >
                        <Icon icon="ic:round-link" width="20" height="20" className="text-blue-600 dark:text-blue-400" />
                      </a>
                    )}
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

export default ProjectArchive;
