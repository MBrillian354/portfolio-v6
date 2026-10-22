import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router";

// Shared header for every archive page.
//
// Archives are real pages now, so the control goes back through history when
// the visitor navigated here from within the site (preserving the homepage
// scroll position) and falls back to the homepage when the URL was opened
// directly. React Router keeps a numeric `idx` in the history state; `idx > 0`
// means there is an in-app entry to return to.
const ArchiveHeader = ({ title }) => {
	const navigate = useNavigate();
	const canGoBack = (window.history.state?.idx ?? 0) > 0;

	const handleBack = (event) => {
		if (!canGoBack) return;

		event.preventDefault();
		navigate(-1);
	};

	return (
		<div className="mb-8 flex flex-col items-start justify-start gap-4 bg-white py-4 dark:bg-gray-900">
			<Link
				to="/"
				replace={!canGoBack}
				onClick={handleBack}
				className="btn-action"
				aria-label={`Back to homepage from ${title}`}
			>
				<Icon
					icon="material-symbols:arrow-back-rounded"
					width="20"
					height="20"
				/>
				<span>M. Brillian</span>
			</Link>
			<h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">
				{title}
			</h1>
		</div>
	);
};

export default ArchiveHeader;
