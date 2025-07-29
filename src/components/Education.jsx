import React from 'react';

const Education = ({ education }) => {
  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <div className="max-w-lg">
          {/* Education */}
          <div className="card-gradient-blue">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
            <div>
              <h4 className="font-medium text-gray-900">{education.degree}</h4>
              <p className="text-gray-600 mb-2">{education.university}</p>
              <p className="text-sm text-gray-500 mb-2">{education.period}</p>
              <p className="text-sm font-medium text-blue-700">GPA: {education.gpa}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
