
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const ExperienceCard = ({ experience, isHovered, isDimmed, onHover, onLeave }) => {
  const typeColors = {
    work: 'bg-green-100 text-green-800',
    project: 'bg-blue-100 text-blue-800',
    internship: 'bg-purple-100 text-purple-800'
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
        <span className="min-w-36 font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 mt-1">{experience.period}</span>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div>
              <h3 className="card-title experience-title">{experience.title}</h3>
              <p className="card-subtitle">{experience.company}</p>
            </div>
            <div className="card-content">
              <span className='hover-rotate-scale'>
                <Icon icon="ic:round-link" width="24" height="24" />
              </span>
              {/* {experience.type && (
                <span className={`badge-alt ${typeColors[experience.type] || 'bg-gray-100 text-gray-800'}`}>
                  {experience.type}
                </span>
              )} */}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{experience.description}</p>

          {experience.scope && experience.scope.length > 0 && (
            <div className="mb-4">
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

const Experience = ({ experiences, internships }) => {
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

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <div className="space-y-6 ">
          {sortedExperiences.map((experience, index) => (
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
      </div>
    </section>
  );
};

export default Experience;
