
const Header = ({ title }) => {

  return (
    <div className="bg-white dark:bg-gray-900 py-4 px-8 sm:static sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
    </div>
  );
};

export default Header;
