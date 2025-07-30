
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const ExperienceCard = ({ experience, isHovered, isDimmed, onHover, onLeave }) => {
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
        <span className="min-w-36 font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 mt-1">{experience.period}</span>
        <div>
          <div className="flex flex-row items-start justify-between mb-3">
            <div>
              <h3 className="card-title experience-title">{experience.title}</h3>
              <p className="card-subtitle">{experience.company}</p>
            </div>
            <div className="card-content">
              <span className='hover-rotate-scale'>
                <Icon icon="ic:round-link" width="24" height="24" />
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3 md:mb-4 leading-relaxed">{experience.description}</p>

          {experience.scope && experience.scope.length > 0 && (
            <div className="mb-3 md:mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Scope of Work:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.scope.map((item, index) => (
                  <span key={index} className="badge-alt">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {experience.techStack && experience.techStack.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech, index) => (
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

const Experience = ({ experiences, internships, showArchiveButton = false, onShowArchive }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const allExperiences = [
    ...experiences.map(exp => ({ ...exp, type: exp.type || 'work' })),
    ...internships.map(exp => ({ ...exp, type: 'internship' }))
  ];

  // Sort by period (most recent first)
  const sortedExperiences = allExperiences.sort((a, b) => {
    // Simple sorting by checking if period contains "Present"
    if (a.period.includes('Present')) return -1;
    if (b.period.includes('Present')) return 1;
    return 0;
  });

  // Show only first 5 if showArchiveButton is true
  const displayExperiences = showArchiveButton ? sortedExperiences.slice(0, 3) : sortedExperiences;

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <div className="mobile-section-spacing">
          {displayExperiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              isHovered={hoveredCard === index}
              isDimmed={hoveredCard !== null && hoveredCard !== index}
              onHover={() => handleCardHover(index)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
        
        {showArchiveButton && sortedExperiences.length > 3 && (
          <div className="mobile-button-margin">
            <button
              onClick={onShowArchive}
              className="btn-action"
            >
              <span>See Full Experience Archive</span>
              <Icon icon="material-symbols:arrow-forward" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
