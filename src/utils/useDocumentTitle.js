// Keeps the browser tab title in sync with the active page.
//
// The base title lives in index.html so the tab is correct before React
// hydrates; this hook is only responsible for switching between the homepage
// title and the per-archive titles.

import { useEffect } from "react";

const BASE_TITLE = "M. Brillian";

export const useDocumentTitle = (title) => {
	useEffect(() => {
		document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
	}, [title]);
};

export default useDocumentTitle;
