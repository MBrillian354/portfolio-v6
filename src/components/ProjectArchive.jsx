import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { normalizeImages } from "../utils/imageUtils";
import { sortByPeriodDesc } from "../utils/periodSort";
import { useImageGallery } from "../utils/useImageGallery";
import ImageLightbox from "./ImageLightbox";

const ARCHIVE_THUMB_LIMIT = 3;

const ProjectImageCell = ({ project, onOpenImage }) => {
	const images = normalizeImages(project.images);
	if (images.length === 0) return null;

	const hiddenCount = images.length - ARCHIVE_THUMB_LIMIT;

	return (
		<div className="flex items-center gap-1.5">
			{images.slice(0, ARCHIVE_THUMB_LIMIT).map((image, index) => (
				<button
					key={`${image.src}-${index}`}
					type="button"
					onClick={(event) => onOpenImage(event, index)}
					aria-label={`View screenshot ${index + 1} of ${images.length} of ${project.title}`}
					aria-haspopup="dialog"
					className="h-10 w-14 shrink-0 cursor-zoom-in overflow-hidden rounded border border-gray-200 bg-gray-100 transition-colors duration-150 ease-out hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500 dark:focus-visible:outline-blue-400"
				>
					<img
						src={image.src}
						alt=""
						loading="lazy"
						decoding="async"
						draggable={false}
						className="h-full w-full object-cover"
					/>
				</button>
			))}
			{hiddenCount > 0 && (
				<button
					type="button"
					onClick={(event) => onOpenImage(event, ARCHIVE_THUMB_LIMIT)}
					aria-label={`View all ${images.length} screenshots of ${project.title}`}
					aria-haspopup="dialog"
					className="cursor-zoom-in badge-alt text-xs transition-colors duration-150 ease-out hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-400"
				>
					+{hiddenCount}
				</button>
			)}
		</div>
	);
};

const ProjectArchive = ({ projects, onClose }) => {
	const gallery = useImageGallery();

	// Handle escape key. The lightbox handles its own Escape while open, so the
	// archive must not also close underneath it.
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key !== "Escape" || gallery.isOpen) return;
			onClose();
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onClose, gallery.isOpen]);

	// Ongoing projects first, then by start date (most recent first)
	const sortedProjects = sortByPeriodDesc(projects);

	const handleOpenImage = (project, event, index) => {
		gallery.open({
			images: project.images,
			index,
			altPrefix: `${project.title} screenshot`,
			trigger: event.currentTarget
		});
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-6xl px-6 py-8 md:px-4">
				{/* Header */}
				<div className="mb-8 flex flex-col items-start justify-start gap-4 bg-white py-4 dark:bg-gray-900">
					<button
						onClick={onClose}
						className="btn-action"
						aria-label="Close Projects Archive"
					>
						<Icon
							icon="material-symbols:arrow-back-rounded"
							width="20"
							height="20"
						/>
						<span>M. Brillian</span>
					</button>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">
						Projects Archive
					</h1>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead className="sticky top-0 z-20 border-b-2 border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
							<tr>
								<th className="min-w-[140px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Period
								</th>
								<th className="min-w-[240px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Project
								</th>
								<th className="min-w-[140px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Company
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Built With
								</th>
								<th className="min-w-[120px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Images
								</th>
								<th className="min-w-[100px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Link
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedProjects.map((project, index) => (
								<tr
									key={index}
									className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
								>
									<td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
										{project.period}
									</td>
									<td className="px-4 py-4">
										<div className="mb-1 font-semibold text-gray-900 dark:text-blue-100">
											{project.title}
										</div>
										<div className="max-w-md text-sm text-gray-600 dark:text-gray-400">
											{project.description}
										</div>
									</td>
									<td className="px-4 py-4 text-gray-700 dark:text-gray-300">
										{project.company}
									</td>
									<td className="px-4 py-4">
										<div className="flex max-w-xs flex-wrap gap-1">
											{project.techStack?.slice(0, 3).map((tech, techIndex) => (
												<span key={techIndex} className="badge-alt text-xs">
													{tech}
												</span>
											))}
											{project.techStack?.length > 3 && (
												<span className="text-xs text-gray-500 dark:text-gray-400">
													+{project.techStack.length - 3} more
												</span>
											)}
										</div>
									</td>
									<td className="px-4 py-4">
										<ProjectImageCell
											project={project}
											onOpenImage={(event, imageIndex) =>
												handleOpenImage(project, event, imageIndex)
											}
										/>
									</td>
									<td className="px-4 py-4">
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
												aria-label={`View ${project.title} project`}
											>
												<Icon
													icon="ic:round-link"
													width="20"
													height="20"
													className="text-blue-600 dark:text-blue-400"
												/>
											</a>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
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
		</div>
	);
};

export default ProjectArchive;
