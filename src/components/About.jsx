import { Icon } from '@iconify/react/dist/iconify.js';
import profileImage from '../assets/DSC8935_resized.jpg';
import cvFile from '../assets/MBrillian_CV_2025_06_26.pdf';
import { useAppToast } from '../utils/toastUtils';

const About = ({ personalInfo }) => {
  const { showCopySuccess, showCopyError } = useAppToast();

  const handleCVDownload = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'MBrillian_CV_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      showCopySuccess('Email');
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = personalInfo.email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showCopySuccess('Email');
      } catch (fallbackError) {
        showCopyError();
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="p-6 flex flex-col max-md:items-center max-md:justify-center bg-white dark:bg-gray-900">
      {/* Profile Picture */}
      <div className="flex mb-4">
        <div className="relative w-48 h-64 rounded-md overflow-hidden ring-1 ring-gray-300 dark:ring-blue-300 group">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-500 ease-in-out"></div>
          </div>
          <img
            src={personalInfo.profileImage || profileImage}
            alt={`${personalInfo.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h1 className="person-name mb-1 mt-4 max-md:text-center">
        {personalInfo.name || "Your Name"}
      </h1>

      <h2 className="person-title pl-1 text-gray-700 dark:text-gray-400">
        {personalInfo.title || "Your Title"}
      </h2>

      <h3 className='pl-1 flex items-base gap-2 text-gray-700 dark:text-gray-400 mb-4 mt-1'>
        <Icon
          icon={personalInfo.countryCode ? `flag:${personalInfo.countryCode}-4x3` : "heroicons:map-pin-16-solid"}
          width="24"
          height="18"
          className='rounded-xs ring-1 ring-gray-300 dark:ring-0'
        />
        <span>{personalInfo.location || "Location not specified"}</span>
      </h3>

      <div className="mt-auto py-4 flex justify-start flex-wrap gap-3 text-gray-700 dark:text-gray-400">
        <button
          onClick={handleCVDownload}
          className="flex items-center gap-1 pl-2 pr-3 py-2 rounded-sm border border-gray-300 dark:border-gray-500 text-gray-400 hover:text-gray-800 dark:text-gray-400 hover:border-gray-800 dark:hover:border-gray-200 dark:hover:text-gray-200 transition-all duration-150 ease-out group hover:cursor-pointer"
          title="Download CV"
        >
          <Icon icon="material-symbols-light:download-2-outline-rounded"
            width="19"
            height="19"
          />
          <span className="text-sm">CV</span>
        </button>
        <button
          onClick={handleEmailCopy}
          className="flex items-center gap-2 px-3 py-2 rounded-sm border border-gray-300 dark:border-gray-500 text-gray-400 hover:text-gray-800 dark:text-gray-400 hover:border-gray-800 dark:hover:border-gray-200 dark:hover:text-gray-200 transition-all duration-150 ease-out group hover:cursor-pointer"
          title="Copy email to clipboard"
        >
          <Icon
            icon="mage:copy"
            width="18"
            height="18"
          />
          <span className="text-sm">{personalInfo.email}</span>
        </button>
        <a
          href={`https://${personalInfo.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-150 ease-out"
        >
          <Icon icon="ant-design:github-outlined" width="32" height="32" />
        </a>
        <a
          href={`https://${personalInfo.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-150 ease-out"
        >
          <Icon icon="uil:linkedin" width="32" height="32" />
        </a>
      </div>
    </div>
  );
};

export default About;
