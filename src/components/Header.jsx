const Header = ({ title }) => {
	return (
		<div className="sticky top-0 z-10 bg-white py-4 max-md:px-4 sm:static dark:bg-gray-900">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
				{title}
			</h2>
		</div>
	);
};

export default Header;
