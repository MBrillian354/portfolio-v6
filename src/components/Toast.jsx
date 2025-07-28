import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const Toast = ({ 
  id, 
  message, 
  type = 'success', 
  duration = 3000, 
  onRemove 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto-remove after duration
    const hideTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onRemove(id), 300); // Match exit animation duration
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [id, duration, onRemove]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'simple-line-icons:check',
          bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          iconClass: 'text-green-600 dark:text-green-400',
          textClass: 'text-green-800 dark:text-green-200'
        };
      case 'error':
        return {
          icon: 'heroicons:x-circle-20-solid',
          bgClass: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          iconClass: 'text-red-600 dark:text-red-400',
          textClass: 'text-red-800 dark:text-red-200'
        };
      case 'warning':
        return {
          icon: 'heroicons:exclamation-triangle-20-solid',
          bgClass: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          iconClass: 'text-yellow-600 dark:text-yellow-400',
          textClass: 'text-yellow-800 dark:text-yellow-200'
        };
      case 'info':
      default:
        return {
          icon: 'heroicons:information-circle-20-solid',
          bgClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          iconClass: 'text-blue-600 dark:text-blue-400',
          textClass: 'text-blue-800 dark:text-blue-200'
        };
    }
  };

  const config = getToastConfig();

  return (
    <div
      className={`
        toast-container
        ${config.bgClass}
        ${isVisible && !isLeaving ? 'toast-enter-active' : ''}
        ${isLeaving ? 'toast-exit-active' : ''}
        ${!isVisible && !isLeaving ? 'toast-enter' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.iconClass}`}>
          <Icon icon={config.icon} width="21" height="21" />
        </div>
        <div className={`flex-1 ${config.textClass}`}>
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(() => onRemove(id), 300);
          }}
          className={`
            flex-shrink-0 ml-2 p-1 rounded-full transition-colors duration-150 ease-out
            hover:bg-black/5 dark:hover:bg-white/10 hover:cursor-pointer
            ${config.iconClass}
          `}
          aria-label="Dismiss"
        >
          <Icon icon="heroicons:x-mark-20-solid" width="16" height="16" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
