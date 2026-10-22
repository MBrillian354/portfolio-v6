import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "../utils/useTheme";

const DarkModeToggle = ({ compact = false, floating = false }) => {
	const { isDark, toggleTheme } = useTheme();

	if (floating) {
		return (
			<button
				onClick={toggleTheme}
				className="group fixed right-6 bottom-6 z-50 rounded-full border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			>
				<div className="relative h-6 w-6">
					{isDark ? (
						<Icon
							icon="material-symbols:light-mode-outline-rounded"
							className="h-6 w-6 text-yellow-500 transition-transform duration-300 group-hover:rotate-12"
						/>
					) : (
						<Icon
							icon="material-symbols:dark-mode-outline-rounded"
							className="h-6 w-6 text-gray-700 transition-transform duration-300 group-hover:rotate-12 dark:text-gray-300"
						/>
					)}
				</div>
			</button>
		);
	}

	if (compact) {
		return (
			<button
				onClick={toggleTheme}
				className="rounded-lg p-2 text-gray-600 transition-colors hover:cursor-pointer hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			>
				{isDark ? (
					<svg
						className="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				) : (
					<svg
						className="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				)}
			</button>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<button
				onClick={toggleTheme}
				className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 hover:cursor-pointer focus:outline-none ${
					isDark ? "bg-blue-800" : "bg-gray-400"
				}`}
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			>
				<span
					className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
						isDark ? "translate-x-7" : "translate-x-1"
					}`}
				>
					<span className="flex h-full w-full items-center justify-center">
						{isDark ? (
							<span className="flex items-center justify-center text-black">
								<Icon
									icon="material-symbols:dark-mode-outline-rounded"
									width="24"
									height="24"
								/>
							</span>
						) : (
							<span className="flex items-center justify-center text-yellow-500">
								<Icon icon="iconamoon:mode-light-bold" width="24" height="24" />
							</span>
						)}
					</span>
				</span>
			</button>
		</div>
	);
};

export default DarkModeToggle;
