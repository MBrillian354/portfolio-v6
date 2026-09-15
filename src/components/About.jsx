import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import profileImage from '../assets/DSC8935_resized.jpg';
import cvFile from '../assets/MBrillian_CV_2025_06_26.pdf';
import { useAppToast } from '../utils/toastUtils';
import ImageLightbox from './ImageLightbox';

const About = ({ personalInfo }) => {
  const { showCopySuccess, showCopyError } = useAppToast();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] = useState(null);

  const imageSrc = personalInfo.profileImage || profileImage;
  const imageAlt = `${personalInfo.name} profile`;

  // Capture the picture's on-screen box so the lightbox can grow out of it.
  const handlePictureClick = (event) => {
    const { width, height, left, top } = event.currentTarget.getBoundingClientRect();
    setLightboxOrigin({ width, height, left, top });
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => setIsLightboxOpen(false);

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
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = personalInfo.email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showCopySuccess('Email');
      } catch {
        showCopyError();
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="p-6 md:p-6 flex flex-col max-md:items-center max-md:justify-center bg-white dark:bg-gray-900">
      {/* Profile Picture */}
      <div className="flex mb-4">
        <button
          type="button"
          onClick={handlePictureClick}
          aria-label={`View full-size photo of ${personalInfo.name}`}
          className="relative w-48 h-64 rounded-md overflow-hidden ring-1 ring-gray-300 dark:ring-blue-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-500 ease-in-out"></div>
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      <ImageLightbox
        src={imageSrc}
        alt={imageAlt}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        originRect={lightboxOrigin}
      />

      <h1 className="person-name mb-1 mt-4 max-md:text-center">
        {personalInfo.name || "Your Name"}
      </h1>

      <h2 className="person-title pl-0.5 text-gray-700 dark:text-gray-400">
        {personalInfo.title || "Your Title"}
      </h2>

      <div className="mt-auto py-4 flex justify-start flex-wrap gap-3 text-gray-700 dark:text-gray-400">
        <button
          onClick={handleCVDownload}
          className="btn-action-compact"
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
          className="btn-action-compact"
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
