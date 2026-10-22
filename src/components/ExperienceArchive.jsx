import { Icon } from "@iconify/react/dist/iconify.js";
import { hasAnyLink, hasLink, openRowLink } from "../utils/linkUtils";
import { sortByPeriodDesc } from "../utils/periodSort";
import ArchiveHeader from "./ArchiveHeader";

const ExperienceArchive = ({ experiences, internships }) => {
	// Combine all experiences
	const allExperiences = [
		...experiences.map((exp) => ({ ...exp, type: exp.type || "work" })),
		...internships.map((exp) => ({ ...exp, type: "internship" }))
	];

	// Ongoing experiences first, then by start date (most recent first)
	const sortedExperiences = sortByPeriodDesc(allExperiences);
	const showLinkColumn = hasAnyLink(sortedExperiences);

	const typeColors = {
		work: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
		project: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
		internship:
			"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-4xl px-6 py-8 md:px-4">
				<ArchiveHeader title="Experience Archive" />

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead className="sticky top-0 z-20 border-b-2 border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
							<tr>
								<th className="min-w-[140px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Period
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Title
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Company
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Type
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Tech Stack
								</th>
								{showLinkColumn && (
									<th className="min-w-[100px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
										Link
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{sortedExperiences.map((experience, index) => (
								<tr
									key={index}
									onClick={(event) => openRowLink(event, experience.link)}
									className={`border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50 ${hasLink(experience) ? "cursor-pointer" : ""}`}
								>
									<td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
										{experience.period}
									</td>
									<td className="px-4 py-4">
										<div className="mb-1 font-semibold text-gray-900 dark:text-blue-100">
											{experience.title}
										</div>
										<div className="max-w-md text-sm text-gray-600 dark:text-gray-400">
											{experience.description}
										</div>
									</td>
									<td className="px-4 py-4 text-gray-700 dark:text-gray-300">
										{experience.company}
									</td>
									<td className="px-4 py-4">
										<span
											className={`badge-type ${typeColors[experience.type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
										>
											{experience.type}
										</span>
									</td>
									<td className="px-4 py-4">
										<div className="flex max-w-xs flex-wrap gap-1">
											{experience.techStack
												?.slice(0, 3)
												.map((tech, techIndex) => (
													<span key={techIndex} className="badge-alt text-xs">
														{tech}
													</span>
												))}
											{experience.techStack?.length > 3 && (
												<span className="text-xs text-gray-500 dark:text-gray-400">
													+{experience.techStack.length - 3} more
												</span>
											)}
										</div>
									</td>
									{showLinkColumn && (
										<td className="px-4 py-4">
											{experience.link && (
												<a
													href={experience.link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-block rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
													aria-label={`View ${experience.title} experience`}
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
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ExperienceArchive;
