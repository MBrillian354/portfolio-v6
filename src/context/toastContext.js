import { createContext, useContext } from 'react';

// Kept separate from ToastProvider.jsx so that the provider module only exports
// components, which is required for React Fast Refresh to work correctly.
export const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
