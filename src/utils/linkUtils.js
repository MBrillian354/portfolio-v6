export const hasLink = (entry) => Boolean(entry?.link);

export const hasAnyLink = (entries) => entries.some(hasLink);

export const openRowLink = (event, link) => {
	if (!link) return;
	// Let links and buttons inside the row handle their own clicks.
	if (event.target.closest("a, button")) return;
	// Dragging to select text inside the row should not navigate.
	if (window.getSelection()?.toString()) return;

	window.open(link, "_blank", "noopener,noreferrer");
};
