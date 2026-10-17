import React from "react";

const Contact = ({ personalInfo }) => {
	return (
		<section id="contact" className="section-padding bg-gray-900 text-blue-100">
			<div className="section-container">
				<h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
					Get In Touch
				</h2>

				<div className="text-center">
					<p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
						I'm always interested in new opportunities and collaborations. Let's
						connect and discuss how we can work together.
					</p>

					<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
						<a href={`mailto:${personalInfo.email}`} className="contact-link">
							<div className="h-5 w-5 rounded bg-blue-500"></div>
							<span>{personalInfo.email}</span>
						</a>

						<a href={`tel:${personalInfo.phone}`} className="contact-link">
							<div className="h-5 w-5 rounded bg-green-500"></div>
							<span>{personalInfo.phone}</span>
						</a>

						<a
							href={`https://${personalInfo.linkedin}`}
							target="_blank"
							rel="noopener noreferrer"
							className="contact-link"
						>
							<div className="h-5 w-5 rounded bg-blue-600"></div>
							<span>LinkedIn</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
