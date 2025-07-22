import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <h2 className="section-title">
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Languages</h3>
            <div className="space-y-2">
              {skills.languages.map((language, index) => (
                <span key={index} className="block text-gray-700 dark:text-gray-300">
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.hardSkills.map((skill, index) => (
                <span key={index} className="badge-blue-alt">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.softSkills.map((skill, index) => (
                <span key={index} className="badge-green">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
