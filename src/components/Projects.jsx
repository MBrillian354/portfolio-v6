import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { sortByPeriodDesc } from "../utils/periodSort";
import { useImageGallery } from "../utils/useImageGallery";
import ImageLightbox from "./ImageLightbox";

const ProjectImageStrip = ({ project, onOpenImage }) => {
	const images = project.images?.filter(Boolean) ?? [];
	if (images.length === 0) return null;

	return (
		<div className="mt-4">
			<div className="project-image-strip">
				{images.map((src, index) => (
					<button
						key={`${src}-${index}`}
						type="button"
						onClick={(event) => onOpenImage(event, index)}
						aria-label={`View screenshot ${index + 1} of ${images.length} of ${project.title}`}
						aria-haspopup="dialog"
						className="group/tile project-image-tile"
					>
						<img
							src={src}
							alt=""
							loading="lazy"
							decoding="async"
							draggable={false}
							className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/tile:scale-[1.04]"
							onError={(event) => {
								// Swap to the icon tile so a broken path doesn't collapse the row.
								const image = event.currentTarget;
								image.style.display = "none";
								const fallback = image.nextElementSibling;
								fallback?.classList.remove("hidden");
								fallback?.classList.add("flex");
							}}
						/>
						<span className="hidden h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
							<Icon
								icon="material-symbols:image-outline"
								width="28"
								height="28"
								className="text-gray-400 dark:text-gray-500"
							/>
						</span>
						<span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-950/0 opacity-0 transition-all duration-200 ease-out group-hover/tile:bg-gray-950/30 group-hover/tile:opacity-100">
							<Icon
								icon="material-symbols:zoom-in"
								width="24"
								height="24"
								className="text-white"
							/>
						</span>
					</button>
				))}
			</div>
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
	const statusColors = {
		Completed:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
		"In Progress":
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
		"On Hold":
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
	};

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

					{project.status && (
						<div className="mb-3 md:mb-4">
							<span
								className={`badge-type ${statusColors[project.status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
							>
								{project.status}
							</span>
						</div>
					)}

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

					<ProjectImageStrip project={project} onOpenImage={onOpenImage} />
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
