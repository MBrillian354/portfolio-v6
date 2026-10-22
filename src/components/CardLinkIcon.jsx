import { Icon } from "@iconify/react/dist/iconify.js";

/**
 * Link affordance for homepage cards. Renders nothing (and removes the
 * surrounding card-content spacing) when the entry has no link. The anchor's
 * ::after stretches over the nearest positioned ancestor (the card), so the
 * whole card opens the link in a new tab.
 */
const CardLinkIcon = ({ href, label }) => {
	if (!href) return null;

	return (
		<div className="card-content">
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={label}
				className="inline-block rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400"
			>
				<span className="inline-flex hover-rotate-scale">
					<Icon icon="ic:round-link" width="24" height="24" />
				</span>
			</a>
		</div>
	);
};

export default CardLinkIcon;
