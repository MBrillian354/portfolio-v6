import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { normalizeImages } from "../utils/imageUtils";
import { sortByPeriodDesc } from "../utils/periodSort";
import { useImageGallery } from "../utils/useImageGallery";
import ImageLightbox from "./ImageLightbox";

// Deepest layer first, so the nearer layer paints on top without extra z-index.
const STACK_LAYER_DEPTHS = [2, 1];

const ProjectImageStack = ({ project, onOpenImage }) => {
	const images = normalizeImages(project.images);
	if (images.length === 0) return null;

	const hasMultipleImages = images.length > 1;
	const visibleLayerCount = Math.min(
		images.length - 1,
		STACK_LAYER_DEPTHS.length
	);
	const layerDepths = hasMultipleImages
		? STACK_LAYER_DEPTHS.slice(-visibleLayerCount)
		: [];

	return (
		<div className="mt-4">
			<button
				type="button"
				onClick={(event) => onOpenImage(event, 0)}
				aria-label={
					hasMultipleImages
						? `View ${images.length} screenshots of ${project.title}`
						: `View screenshot of ${project.title}`
				}
				aria-haspopup="dialog"
				className="project-image-stack"
			>
				{layerDepths.map((depth) => (
					<span
						key={depth}
						aria-hidden="true"
						data-depth={depth}
						className="project-image-stack-layer"
					/>
				))}

				<span className="project-image-tile relative z-10 block">
					<img
						src={images[0].src}
						alt=""
						loading="lazy"
						decoding="async"
						draggable={false}
						className="project-image-stack-image"
						onError={(event) => {
							// Swap to the icon tile so a broken path doesn't collapse the thumbnail.
							const image = event.currentTarget;
							image.style.display = "none";
							const fallback = image.nextElementSibling;
							fallback?.classList.remove("hidden");
							fallback?.classList.add("flex");
						}}
					/>
					<span className="absolute inset-0 hidden items-center justify-center bg-gray-100 dark:bg-gray-700">
						<Icon
							icon="material-symbols:image-outline"
							width="28"
							height="28"
							className="text-gray-400 dark:text-gray-500"
						/>
					</span>
					{hasMultipleImages && (
						<span className="project-image-count" aria-hidden="true">
							<Icon
								icon="material-symbols:image-outline"
								width="13"
								height="13"
							/>
							<span>{images.length}</span>
						</span>
					)}
				</span>
			</button>
		</div>
	);
};

const ProjectCard = ({
	project,
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
			<div className="flex flex-col gap-2 md:flex-row">
				<span className="mt-1 mb-2 min-w-36 text-sm font-semibold text-gray-500 dark:text-gray-400">
					{project.period}
				</span>
				<div>
					<div className="mb-3 flex items-start justify-between">
						<div>
							<h3 className="experience-title card-title">{project.title}</h3>
							<p className="card-subtitle">{project.company}</p>
						</div>
						<div className="card-content">
							<span className="hover-rotate-scale">
								<Icon icon="ic:round-link" width="24" height="24" />
							</span>
						</div>
					</div>

					<p className="mb-3 leading-relaxed text-gray-700 md:mb-4 dark:text-gray-300">
						{project.description}
					</p>

					{project.techStack && project.techStack.length > 0 && (
						<div>
							<h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
								Tech Stack:
							</h4>
							<div className="flex flex-wrap gap-2">
								{project.techStack.map((tech, index) => (
									<span key={index} className="badge-alt">
										{tech}
									</span>
								))}
							</div>
						</div>
					)}

					<ProjectImageStack project={project} onOpenImage={onOpenImage} />
				</div>
			</div>
		</div>
	);
};

const Projects = ({ projects, showArchiveButton = false, onShowArchive }) => {
	const [hoveredCard, setHoveredCard] = useState(null);
	const gallery = useImageGallery();

	// Ongoing projects first, then by start date (most recent first)
	const sortedProjects = sortByPeriodDesc(projects);

	// Show only the first 3 if showArchiveButton is true
	const displayProjects = showArchiveButton
		? sortedProjects.slice(0, 3)
		: sortedProjects;

	const handleCardHover = (index) => {
		setHoveredCard(index);
	};

	const handleCardLeave = () => {
		setHoveredCard(null);
	};

	const handleOpenImage = (project, event, index) => {
		gallery.open({
			images: project.images,
			index,
			altPrefix: `${project.title} screenshot`,
			trigger: event.currentTarget
		});
	};

	return (
		<section id="projects" className="section-padding">
			<div className="section-container">
				<div className="mobile-section-spacing">
					{displayProjects.map((project, index) => (
						<ProjectCard
							key={index}
							project={project}
							isHovered={hoveredCard === index}
							isDimmed={hoveredCard !== null && hoveredCard !== index}
							onHover={() => handleCardHover(index)}
							onLeave={handleCardLeave}
							onOpenImage={(event, imageIndex) =>
								handleOpenImage(project, event, imageIndex)
							}
						/>
					))}
				</div>

				{showArchiveButton && sortedProjects.length > 3 && (
					<div className="mobile-button-margin">
						<button onClick={onShowArchive} className="btn-action">
							<span>See Full Projects Archive</span>
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

export default Projects;
