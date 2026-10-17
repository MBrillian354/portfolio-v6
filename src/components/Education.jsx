import React from "react";

const Education = ({ education }) => {
	return (
		<section id="education" className="section-padding">
			<div className="section-container">
				<div className="max-w-lg">
					{/* Education */}
					<div className="card-gradient-blue">
						<h3 className="mb-4 text-lg font-semibold text-gray-900">
							Education
						</h3>
						<div>
							<h4 className="font-medium text-gray-900">{education.degree}</h4>
							<p className="mb-2 text-gray-600">{education.university}</p>
							<p className="mb-2 text-sm text-gray-500">{education.period}</p>
							<p className="text-sm font-medium text-blue-700">
								GPA: {education.gpa}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Education;
