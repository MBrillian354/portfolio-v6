import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useImageGallery } from "../utils/useImageGallery";
import CardLinkIcon from "./CardLinkIcon";
import CertificateThumbnail from "./CertificateThumbnail";
import ImageLightbox from "./ImageLightbox";

const CertificateCard = ({
	certificate,
	isHovered,
	isDimmed,
	onHover,
	onLeave,
	onOpenImage
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
				<div className="min-w-36 self-start md:self-center">
					<CertificateThumbnail
						certificate={certificate}
						onOpen={onOpenImage}
						className="h-24 w-full md:w-36"
					/>
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
	const gallery = useImageGallery();

	// Show only first 3 if showArchiveButton is true
	const displayCertificates = showArchiveButton
		? certificates.slice(0, 3)
		: certificates;

	const handleCardHover = (index) => {
		setHoveredCard(index);
	};

	const handleCardLeave = () => {
		setHoveredCard(null);
	};

	const handleOpenImage = (event, index) => {
		gallery.open({
			images: displayCertificates.map(({ image, title }) => ({
				src: image,
				caption: title
			})),
			index,
			altPrefix: "Certificate",
			trigger: event.currentTarget
		});
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
							onOpenImage={(event) => handleOpenImage(event, index)}
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

			<ImageLightbox
				src={gallery.src}
				alt={gallery.alt}
				caption={gallery.caption}
				isOpen={gallery.isOpen}
				onClose={gallery.close}
				originRect={gallery.originRect}
				onPrev={gallery.prev}
				onNext={gallery.next}
				index={gallery.index}
				count={gallery.count}
				returnFocusTo={gallery.trigger}
			/>
		</section>
	);
};

export default Certificates;
