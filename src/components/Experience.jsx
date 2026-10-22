import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { sortByPeriodDesc } from "../utils/periodSort";
import CardLinkIcon from "./CardLinkIcon";

const ExperienceCard = ({
	experience,
	isHovered,
	isDimmed,
	onHover,
	onLeave
}) => {
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
			<div className="flex flex-col gap-2 md:flex-row">
				<span className="mt-1 mb-2 min-w-36 text-sm font-semibold text-gray-500 dark:text-gray-400">
					{experience.period}
				</span>
				<div>
					<div className="mb-3 flex flex-row items-start justify-between">
						<div>
							<h3 className="experience-title card-title">
								{experience.title}
							</h3>
							<p className="card-subtitle">{experience.company}</p>
						</div>
						<CardLinkIcon
							href={experience.link}
							label={`View ${experience.title} experience`}
						/>
					</div>

					<p className="mb-3 leading-relaxed text-gray-700 md:mb-4 dark:text-gray-300">
						{experience.description}
					</p>

					{experience.scope && experience.scope.length > 0 && (
						<div className="mb-3 md:mb-4">
							<h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
								Scope of Work:
							</h4>
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
							<h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
								Tech Stack:
							</h4>
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

const Experience = ({
	experiences,
	internships,
	showArchiveButton = false,
	onShowArchive
}) => {
	const [hoveredCard, setHoveredCard] = useState(null);

	const allExperiences = [
		...experiences.map((exp) => ({ ...exp, type: exp.type || "work" })),
		...internships.map((exp) => ({ ...exp, type: "internship" }))
	];

	// Ongoing experiences first, then by start date (most recent first)
	const sortedExperiences = sortByPeriodDesc(allExperiences);

	// Show only the first 3 if showArchiveButton is true
	const displayExperiences = showArchiveButton
		? sortedExperiences.slice(0, 3)
		: sortedExperiences;

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
						<button onClick={onShowArchive} className="btn-action">
							<span>See Full Experience Archive</span>
							<Icon
								icon="material-symbols:arrow-forward"
								width="20"
								height="20"
							/>
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Experience;
