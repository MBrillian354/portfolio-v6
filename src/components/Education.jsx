import React from 'react';

const Education = ({ education, certificates }) => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <h2 className="section-title">
          Education & Certifications
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          {/* Certifications */}
          <div className="card-gradient-green">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
