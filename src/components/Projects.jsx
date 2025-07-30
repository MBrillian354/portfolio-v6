import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const ProjectCard = ({ project, isHovered, isDimmed, onHover, onLeave }) => {
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  const getCardClasses = () => {
    let baseClasses = "card-hover-group";
    if (isHovered) {
      baseClasses += " card-hover-active";
    } else if (isDimmed) {
      baseClasses += " card-hover-dimmed";
    }
    return baseClasses;
  };

  return (
    <div
      className={getCardClasses()}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col md:flex-row gap-2">
        <span className="min-w-36 font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 mt-1">{project.period}</span>
        <div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="card-title experience-title">{project.title}</h3>
              <p className="card-subtitle">{project.company}</p>
            </div>
            <div className="card-content">
              <span className='hover-rotate-scale'>
                <Icon icon="ic:round-link" width="24" height="24" />
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3 md:mb-4 leading-relaxed">{project.description}</p>

          {project.status && (
            <div className="mb-3 md:mb-4">
              <span className={`badge-type ${statusColors[project.status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                {project.status}
              </span>
            </div>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="badge-alt">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ projects, showArchiveButton = false, onShowArchive }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sort by period (most recent first)
  const sortedProjects = projects.sort((a, b) => {
    if (a.period.includes('Present')) return -1;
    if (b.period.includes('Present')) return 1;
    return 0;
  });

  // Show only first 5 if showArchiveButton is true
  const displayProjects = showArchiveButton ? sortedProjects.slice(0, 3) : sortedProjects;

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="mobile-section-spacing">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isHovered={hoveredCard === index}
              isDimmed={hoveredCard !== null && hoveredCard !== index}
              onHover={() => handleCardHover(index)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
        
        {showArchiveButton && sortedProjects.length > 3 && (
          <div className="mobile-button-margin">
            <button
              onClick={onShowArchive}
              className="btn-action"
            >
              <span>See Full Projects Archive</span>
              <Icon icon="material-symbols:arrow-forward" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
