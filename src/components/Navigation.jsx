import React, { useState, useEffect } from "react";

// const Navigation = ({ isMobileOnly = false }) => {
const Navigation = () => {
	const [activeSection, setActiveSection] = useState("about");

	useEffect(() => {
		const handleScroll = () => {
			const sections = [
				"about",
				"current-technologies",
				"experience",
				"projects",
				"certificates",
				"education"
			];
			const scrollPosition = window.scrollY + 100; // Offset for header height

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;

					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check initial position

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ href: "#about", label: "ABOUT", id: "about" },
		{
			href: "#current-technologies",
			label: "TECHNOLOGIES",
			id: "current-technologies"
		},
		{ href: "#experience", label: "EXPERIENCE", id: "experience" },
		{ href: "#projects", label: "PROJECTS", id: "projects" },
		{ href: "#certificates", label: "CERTIFICATES", id: "certificates" }
		// { href: '#education', label: 'EDUCATION', id: 'education' },
		// { href: '#skills', label: 'SKILLS', id: 'skills' },
	];

	const activeItem = navItems.find((item) => item.id === activeSection);

	return (
		<>
			{/* Mobile: Top sticky header */}
			<header className="sticky top-0 z-50 bg-white shadow-sm sm:hidden dark:bg-gray-900">
				<div className="mx-auto max-w-4xl px-6 py-4">
					<div className="flex items-center justify-center">
						<h1 className="text-lg font-medium text-blue-600 dark:text-blue-400">
							{activeItem?.label || "About"}
						</h1>
					</div>
				</div>
			</header>

			{/* Desktop: Navigation */}
			<div className="hidden sm:block">
				<div className="px-6">
					<nav className="flex flex-col items-start">
						{navItems.map((item) => (
							<a key={item.id} href={item.href} className="group nav-link">
								<span
									className={`mr-4 mb-1 inline-block h-[1px] align-middle transition-all duration-150 ease-out ${
										activeSection === item.id
											? "w-14 bg-gray-500 dark:bg-white"
											: "w-8 bg-gray-300 dark:bg-gray-500"
									} group-hover:w-14 group-hover:bg-gray-500 group-hover:dark:bg-white`}
								/>

								<span
									className={`text-gray-400 ${
										activeSection === item.id
											? "text-gray-600 dark:text-blue-100"
											: "dark:text-gray-500"
									} transition-colors duration-150 ease-out group-hover:text-gray-600 group-hover:dark:text-blue-100`}
								>
									{item.label}
								</span>
							</a>
						))}
					</nav>
				</div>
			</div>
		</>
	);
};

export default Navigation;
