import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { sortByPeriodDesc } from "../utils/periodSort";

const ProjectArchive = ({ projects, onClose }) => {
	// Handle escape key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onClose]);
	// Ongoing projects first, then by start date (most recent first)
	const sortedProjects = sortByPeriodDesc(projects);

	const statusColors = {
		Completed:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
		"In Progress":
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
		"On Hold":
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-4xl px-6 py-8 md:px-4">
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
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Project
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Company
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Built With
								</th>
								<th className="min-w-[100px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Status
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
										<span
											className={`badge-type ${statusColors[project.status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
										>
											{project.status || "Unknown"}
										</span>
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
		</div>
	);
};

export default ProjectArchive;
