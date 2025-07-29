import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const CertificateCard = ({ certificate, isHovered, isDimmed, onHover, onLeave }) => {
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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Certificate Image */}
        <div className="min-w-36 self-center flex-shrink-0">
          <div className="w-full h-24 md:w-36 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
            <img 
              src={certificate.image} 
              alt={`${certificate.title} Certificate`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full hidden items-center justify-center bg-gray-100 dark:bg-gray-700">
              <Icon 
                icon="material-symbols:workspace-premium" 
                width="32" 
                height="32" 
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="card-title experience-title">{certificate.title}</h3>
            </div>
            <div className="card-content">
              <span className='hover-rotate-scale'>
                <Icon icon="ic:round-link" width="24" height="24" />
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{certificate.description}</p>
        </div>
      </div>
    </div>
  );
};

const Certificates = ({ certificates, showArchiveButton = false, onShowArchive }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Show only first 5 if showArchiveButton is true
  const displayCertificates = showArchiveButton ? certificates.slice(0, 3) : certificates;

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="certificates" className="section-padding">
      <div className="section-container">
        <div className="space-y-6">
          {displayCertificates.map((certificate, index) => (
            <CertificateCard
              key={index}
              certificate={certificate}
              isHovered={hoveredCard === index}
              isDimmed={hoveredCard !== null && hoveredCard !== index}
              onHover={() => handleCardHover(index)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
        
        {showArchiveButton && certificates.length > 3 && (
          <div className="mt-8">
            <button
              onClick={onShowArchive}
              className="btn-action"
            >
              <span>See Full Certificate Archive</span>
              <Icon icon="material-symbols:arrow-forward" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
