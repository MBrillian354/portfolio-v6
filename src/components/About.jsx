import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import cvFile from "../assets/MBrillian_CV_2025_06_26.pdf";
import { useAppToast } from "../utils/toastUtils";
import { useTheme } from "../utils/useTheme";
import ImageLightbox from "./ImageLightbox";

const About = ({ personalInfo }) => {
	const { showCopySuccess, showCopyError } = useAppToast();
	const { isDark } = useTheme();
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [lightboxOrigin, setLightboxOrigin] = useState(null);

	const lightImage = personalInfo.profileImage;
	const darkImage = personalInfo.profileImageDark;
	const imageSrc = isDark ? darkImage : lightImage;
	const imageAlt = `${personalInfo.name} profile`;

	// Capture the picture's on-screen box so the lightbox can grow out of it.
	const handlePictureClick = (event) => {
		const { width, height, left, top } =
			event.currentTarget.getBoundingClientRect();
		setLightboxOrigin({ width, height, left, top });
		setIsLightboxOpen(true);
	};

	const handleLightboxClose = () => setIsLightboxOpen(false);

	const handleCVDownload = () => {
		const link = document.createElement("a");
		link.href = cvFile;
		link.download = "MBrillian_CV_2025.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleEmailCopy = async () => {
		try {
			await navigator.clipboard.writeText(personalInfo.email);
			showCopySuccess("Email");
		} catch {
			// Fallback for browsers that don't support clipboard API
			const textArea = document.createElement("textarea");
			textArea.value = personalInfo.email;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand("copy");
				showCopySuccess("Email");
			} catch {
				showCopyError();
			}
			document.body.removeChild(textArea);
		}
	};

	return (
		<div className="flex flex-col bg-white p-6 max-md:items-center max-md:justify-center md:p-6 dark:bg-gray-900">
			{/* Profile Picture */}
			{imageSrc && (
				<div className="mb-4 flex">
					<button
						type="button"
						onClick={handlePictureClick}
						aria-label={`View full-size photo of ${personalInfo.name}`}
						className="group relative h-64 w-48 overflow-hidden rounded-md ring-1 ring-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:ring-blue-300 dark:focus-visible:outline-blue-400"
					>
						{/* Shimmer overlay */}
						<div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="absolute inset-0 translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out group-hover:-translate-x-full"></div>
						</div>
						{lightImage && (
							<img
								src={lightImage}
								alt={imageAlt}
								className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none dark:opacity-0"
							/>
						)}
						{darkImage && (
							<img
								src={darkImage}
								alt={lightImage ? "" : imageAlt}
								aria-hidden={lightImage ? "true" : undefined}
								className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 motion-reduce:transition-none dark:opacity-100"
							/>
						)}
					</button>
				</div>
			)}

			{imageSrc && (
				<ImageLightbox
					src={imageSrc}
					alt={imageAlt}
					isOpen={isLightboxOpen}
					onClose={handleLightboxClose}
					originRect={lightboxOrigin}
				/>
			)}

			<h1 className="mt-4 person-name mb-1 max-md:text-center">
				{personalInfo.name || "Your Name"}
			</h1>

			{/* <h2 className="person-title pl-0.5 text-gray-700 dark:text-gray-400">
				{personalInfo.title || "Your Title"}
			</h2> */}

			<div className="mt-auto flex flex-wrap justify-start gap-3 py-4 text-gray-700 dark:text-gray-400">
				<button
					onClick={handleCVDownload}
					className="btn-action-compact"
					title="Download CV"
				>
					<Icon
						icon="material-symbols-light:download-2-outline-rounded"
						width="19"
						height="19"
					/>
					<span className="text-sm">CV</span>
				</button>
				<button
					onClick={handleEmailCopy}
					className="btn-action-compact"
					title="Copy email to clipboard"
				>
					<Icon icon="mage:copy" width="18" height="18" />
					<span className="text-sm">{personalInfo.email}</span>
				</button>
				<a
					href={`https://${personalInfo.github}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center text-gray-400 transition-colors duration-150 ease-out hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
				>
					<Icon icon="ant-design:github-outlined" width="32" height="32" />
				</a>
				<a
					href={`https://${personalInfo.linkedin}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center text-gray-400 transition-colors duration-150 ease-out hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
				>
					<Icon icon="uil:linkedin" width="32" height="32" />
				</a>
			</div>
		</div>
	);
};

export default About;
