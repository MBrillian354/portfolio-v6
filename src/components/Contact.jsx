import React from 'react';

const Contact = ({ personalInfo }) => {
  return (
    <section id="contact" className="section-padding bg-gray-900 text-blue-100">
      <div className="section-container">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Get In Touch
        </h2>
        
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Let's connect and discuss how we can work together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="contact-link"
            >
              <div className="w-5 h-5 bg-blue-500 rounded"></div>
              <span>{personalInfo.email}</span>
            </a>
            
            <a 
              href={`tel:${personalInfo.phone}`}
              className="contact-link"
            >
              <div className="w-5 h-5 bg-green-500 rounded"></div>
              <span>{personalInfo.phone}</span>
            </a>
            
            <a 
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <div className="w-5 h-5 bg-blue-600 rounded"></div>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
