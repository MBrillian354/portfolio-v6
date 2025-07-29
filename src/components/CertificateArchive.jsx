import React, { useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const CertificateArchive = ({ certificates, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="section-container py-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4 mb-8 bg-white dark:bg-gray-900 py-4">
          <button
            onClick={onClose}
            className="btn-action"
            aria-label="Close Certificate Archive"
          >
            <Icon icon="material-symbols:arrow-back-rounded" width="20" height="20" />
            <span>M. Brillian</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">Certificate Archive</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100 min-w-[100px]">
                  Preview
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Title
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100">
                  Description
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-blue-100 min-w-[100px]">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img
                        src={certificate.image}
                        alt={`${certificate.title} Certificate`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full hidden items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <Icon
                          icon="material-symbols:workspace-premium"
                          width="20"
                          height="20"
                          className="text-gray-400 dark:text-gray-500"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 dark:text-blue-100">
                      {certificate.title}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-700 dark:text-gray-300 max-w-md">
                      {certificate.description}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label={`View ${certificate.title} certificate`}
                    >
                      <Icon icon="ic:round-link" width="20" height="20" className="text-blue-600 dark:text-blue-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CertificateArchive;
