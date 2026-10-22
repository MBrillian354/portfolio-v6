import { Icon } from "@iconify/react/dist/iconify.js";

// Shown while a lazily-loaded archive route chunk is fetched.
const RouteFallback = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
			<Icon
				icon="svg-spinners:ring-resize"
				width="28"
				height="28"
				className="text-gray-400 dark:text-gray-500"
				aria-label="Loading page"
				role="status"
			/>
		</div>
	);
};

export default RouteFallback;
