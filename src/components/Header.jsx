const Header = ({ title }) => {
	return (
		<div className="sticky top-0 z-10 bg-white px-6 py-4 sm:static md:px-8 dark:bg-gray-900">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
				{title}
			</h1>
		</div>
	);
};

export default Header;
