// Toast utility functions for common use cases
import { useToast } from '../components/ToastProvider';

// Custom hook for common toast actions
export const useAppToast = () => {
  const toast = useToast();

  return {
    // Success actions
    showCopySuccess: (item = 'Content') => 
      toast.showSuccess(`${item} copied to clipboard!`, 2500),
    
    showDownloadSuccess: (item = 'File') => 
      toast.showSuccess(`${item} downloaded successfully!`, 2500),
    
    showSaveSuccess: (item = 'Changes') => 
      toast.showSuccess(`${item} saved successfully!`, 2500),

    // Error actions  
    showCopyError: () => 
      toast.showError('Failed to copy. Please try again.', 3000),
    
    showNetworkError: () => 
      toast.showError('Network error. Please check your connection.', 4000),
    
    showGenericError: (message = 'Something went wrong. Please try again.') => 
      toast.showError(message, 3000),

    // Info actions
    showInfo: (message, duration = 3000) => 
      toast.showInfo(message, duration),

    // Warning actions
    showWarning: (message, duration = 3500) => 
      toast.showWarning(message, duration),

    // Direct access to toast methods
    ...toast
  };
};

// Utility function for handling async operations with toast feedback
export const withToastFeedback = async (
  operation, 
  { 
    successMessage = 'Operation completed successfully!',
    errorMessage = 'Operation failed. Please try again.',
    loadingMessage = null,
    showLoading = false
  } = {}
) => {
  const toast = useToast();
  
  let loadingToastId = null;
  
  try {
    if (showLoading && loadingMessage) {
      loadingToastId = toast.showInfo(loadingMessage, 10000); // Long duration for loading
    }
    
    const result = await operation();
    
    if (loadingToastId) {
      toast.removeToast(loadingToastId);
    }
    
    toast.showSuccess(successMessage, 2500);
    return result;
    
  } catch (error) {
    if (loadingToastId) {
      toast.removeToast(loadingToastId);
    }
    
    toast.showError(errorMessage, 3000);
    throw error;
  }
};

export default { useAppToast, withToastFeedback };
