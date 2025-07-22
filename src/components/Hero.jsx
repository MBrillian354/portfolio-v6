import React from 'react';

const Hero = ({ personalInfo }) => {
  return (
    <section id="about" className="section-padding">
      <div className="section-container mt-8 pl-8">
        {Array.isArray(personalInfo.summary) ? (
          personalInfo.summary.map((text, idx) => (
            <p key={idx} className="person-summary text-gray-600 dark:text-gray-400">
              {text}
            </p>
          ))
        ) : (
          <p className="person-summary text-gray-600 dark:text-gray-400">
            {personalInfo.summary}
          </p>
        )}
        {/* <div className="text-center">
          <div className="avatar">
            <span className="avatar-text">
              {personalInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          <h1 className="hero-person-name">
            {personalInfo.name}
          </h1>
          <p className="hero-person-summary">
            {personalInfo.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="btn-primary"
            >
              Get In Touch
            </a>
            <a 
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn Profile
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
