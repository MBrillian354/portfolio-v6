import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { hasAnyLink, hasLink, openRowLink } from "../utils/linkUtils";
import { useImageGallery } from "../utils/useImageGallery";
import CertificateThumbnail from "./CertificateThumbnail";
import ImageLightbox from "./ImageLightbox";

const CertificateArchive = ({ certificates, onClose }) => {
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

	const showLinkColumn = hasAnyLink(certificates);

	const handleOpenImage = (event, index) => {
		gallery.open({
			images: certificates.map(({ image, title }) => ({
				src: image,
				caption: title
			})),
			index,
			altPrefix: "Certificate",
			trigger: event.currentTarget
		});
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-4xl px-6 py-8 md:px-4">
				{/* Header */}
				<div className="mb-8 flex flex-col items-start justify-start gap-4 bg-white py-4 dark:bg-gray-900">
					<button
						onClick={onClose}
						className="btn-action"
						aria-label="Close Certificate Archive"
					>
						<Icon
							icon="material-symbols:arrow-back-rounded"
							width="20"
							height="20"
						/>
						<span>M. Brillian</span>
					</button>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">
						Certificate Archive
					</h1>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead className="sticky top-0 z-20 border-b-2 border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
							<tr>
								<th className="min-w-[100px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Preview
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Title
								</th>
								<th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
									Description
								</th>
								{showLinkColumn && (
									<th className="min-w-[100px] px-4 py-4 text-left font-semibold text-gray-900 dark:text-blue-100">
										Link
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{certificates.map((certificate, index) => (
								<tr
									key={index}
									onClick={(event) => openRowLink(event, certificate.link)}
									className={`border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50 ${hasLink(certificate) ? "cursor-pointer" : ""}`}
								>
									<td className="px-4 py-4">
										<CertificateThumbnail
											certificate={certificate}
											onOpen={(event) => handleOpenImage(event, index)}
											className="h-12 w-16"
										/>
									</td>
									<td className="px-4 py-4">
										<div className="font-semibold text-gray-900 dark:text-blue-100">
											{certificate.title}
										</div>
									</td>
									<td className="px-4 py-4">
										<div className="max-w-md text-gray-700 dark:text-gray-300">
											{certificate.description}
										</div>
									</td>
									{showLinkColumn && (
										<td className="px-4 py-4">
											{certificate.link && (
												<a
													href={certificate.link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-block rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
													aria-label={`View ${certificate.title} certificate`}
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

export default CertificateArchive;
