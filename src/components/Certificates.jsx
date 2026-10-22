import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import CardLinkIcon from "./CardLinkIcon";

const CertificateCard = ({
	certificate,
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
			<div className="flex flex-col gap-4 md:flex-row">
				{/* Certificate Image */}
				<div className="min-w-36 flex-shrink-0 self-center">
					<div className="h-24 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 md:h-24 md:w-36 dark:border-gray-600 dark:bg-gray-700">
						<img
							src={certificate.image}
							alt={`${certificate.title} Certificate`}
							className="h-full w-full object-cover"
							onError={(e) => {
								// Fallback to icon if image fails to load
								e.target.style.display = "none";
								e.target.nextSibling.style.display = "flex";
							}}
						/>
						<div className="hidden h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
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
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h3 className="experience-title card-title">
								{certificate.title}
							</h3>
						</div>
						<CardLinkIcon
							href={certificate.link}
							label={`View ${certificate.title} certificate`}
						/>
					</div>

					<p className="leading-relaxed text-gray-700 dark:text-gray-300">
						{certificate.description}
					</p>
				</div>
			</div>
		</div>
	);
};

const Certificates = ({
	certificates,
	showArchiveButton = false,
	onShowArchive
}) => {
	const [hoveredCard, setHoveredCard] = useState(null);

	// Show only first 5 if showArchiveButton is true
	const displayCertificates = showArchiveButton
		? certificates.slice(0, 3)
		: certificates;

	const handleCardHover = (index) => {
		setHoveredCard(index);
	};

	const handleCardLeave = () => {
		setHoveredCard(null);
	};

	return (
		<section id="certificates" className="section-padding">
			<div className="section-container">
				<div className="mobile-section-spacing">
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
					<div className="mobile-button-margin">
						<button onClick={onShowArchive} className="btn-action">
							<span>See Full Certificate Archive</span>
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

export default Certificates;
