import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

/**
 * Clickable certificate preview. Opens the fullscreen lightbox via `onOpen` and
 * shows a zoom affordance on hover/focus. The size is set by the caller through
 * `className` because the homepage cards and the archive table use different
 * thumbnail dimensions.
 */
const CertificateThumbnail = ({ certificate, onOpen, className = "" }) => {
	const [hasError, setHasError] = useState(false);

	return (
		<button
			type="button"
			onClick={onOpen}
			aria-label={`View full-size ${certificate.title} certificate`}
			aria-haspopup="dialog"
			className={`group/cert relative z-10 block shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-colors duration-150 ease-out hover:border-blue-400 focus-visible:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500 dark:focus-visible:border-blue-500 dark:focus-visible:outline-blue-400 ${className}`}
		>
			{hasError ? (
				<span className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
					<Icon
						icon="material-symbols:workspace-premium"
						width="24"
						height="24"
						className="text-gray-400 dark:text-gray-500"
					/>
				</span>
			) : (
				<>
					<img
						src={certificate.image}
						alt=""
						loading="lazy"
						decoding="async"
						draggable={false}
						onError={() => setHasError(true)}
						className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover/cert:scale-105 motion-safe:group-focus-visible/cert:scale-105"
					/>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-950/35 opacity-0 transition-opacity duration-150 ease-out group-hover/cert:opacity-100 group-focus-visible/cert:opacity-100"
					>
						<Icon
							icon="material-symbols:zoom-in-rounded"
							width="24"
							height="24"
							className="text-white"
						/>
					</span>
				</>
			)}
		</button>
	);
};

export default CertificateThumbnail;
