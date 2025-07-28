# Toast Notification System

A modern, accessible toast notification system built for the portfolio project with consistent styling and animations.

## Features

- 🎨 **Consistent Design**: Matches the project's design system with dark mode support
- ⚡ **Smooth Animations**: Modern slide-in/out animations with proper timing
- 📱 **Responsive**: Adapts to mobile and desktop layouts
- ♿ **Accessible**: Proper ARIA labels and dismissible notifications
- 🎯 **Type-Safe**: Built with TypeScript patterns for reliability
- 🔧 **Easy to Use**: Simple API with utility functions for common use cases

## Usage

### Basic Usage

```jsx
import { useToast } from '../components/ToastProvider';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = () => {
    showSuccess('Operation completed successfully!');
    showError('Something went wrong!');
    showWarning('Please check your input.');
    showInfo('Did you know...?');
  };

  return <button onClick={handleAction}>Click me</button>;
};
```

### Using Utility Functions

```jsx
import { useAppToast } from '../utils/toastUtils';

const MyComponent = () => {
  const { showCopySuccess, showCopyError, showDownloadSuccess } = useAppToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('some text');
      showCopySuccess('Text'); // Shows "Text copied to clipboard!"
    } catch (error) {
      showCopyError(); // Shows "Failed to copy. Please try again."
    }
  };

  return <button onClick={handleCopy}>Copy</button>;
};
```

### Advanced Usage with Async Operations

```jsx
import { withToastFeedback } from '../utils/toastUtils';

const MyComponent = () => {
  const handleAsyncOperation = () => {
    withToastFeedback(
      async () => {
        // Your async operation
        await someApiCall();
      },
      {
        successMessage: 'Data saved successfully!',
        errorMessage: 'Failed to save data.',
        loadingMessage: 'Saving...',
        showLoading: true
      }
    );
  };

  return <button onClick={handleAsyncOperation}>Save</button>;
};
```

## Toast Types

### Success Toast
- **Use for**: Successful operations, confirmations
- **Duration**: 2.5 seconds
- **Color**: Green theme

### Error Toast  
- **Use for**: Failed operations, validation errors
- **Duration**: 3-4 seconds
- **Color**: Red theme

### Warning Toast
- **Use for**: Important notices, cautions
- **Duration**: 3.5 seconds  
- **Color**: Yellow theme

### Info Toast
- **Use for**: General information, tips
- **Duration**: 3 seconds
- **Color**: Blue theme

## API Reference

### useToast Hook

```typescript
const {
  addToast,     // (message, type, duration) => id
  removeToast,  // (id) => void
  showSuccess,  // (message, duration?) => id
  showError,    // (message, duration?) => id
  showWarning,  // (message, duration?) => id
  showInfo      // (message, duration?) => id
} = useToast();
```

### useAppToast Hook

Pre-configured utility functions for common use cases:

```typescript
const {
  showCopySuccess,      // (item?) => void
  showDownloadSuccess,  // (item?) => void
  showSaveSuccess,      // (item?) => void
  showCopyError,        // () => void
  showNetworkError,     // () => void
  showGenericError,     // (message?) => void
  showInfo,             // (message, duration?) => void
  showWarning           // (message, duration?) => void
} = useAppToast();
```

## Styling

The toast system uses the project's design tokens:

- **Font**: DM Sans (project default)
- **Colors**: Matches the existing blue/gray theme
- **Animations**: 300ms cubic-bezier transitions
- **Spacing**: Consistent with project padding/margins
- **Dark Mode**: Automatic support via CSS custom properties

## Positioning

- **Desktop**: Top-right corner with 1rem spacing
- **Mobile**: Full-width with 0.5rem spacing from edges
- **Z-index**: 9999 (above all other elements)

## Accessibility

- Toasts are dismissible via click or automatic timeout
- Proper color contrast ratios maintained
- ARIA labels for screen readers
- Keyboard accessible dismiss buttons

## Best Practices

1. **Keep messages concise** - Use clear, actionable language
2. **Choose appropriate types** - Match the toast type to the situation
3. **Don't spam toasts** - Avoid showing too many at once
4. **Provide context** - Include relevant details when helpful
5. **Test across devices** - Ensure good experience on all screen sizes

## Integration

The toast system is automatically available throughout the app via the `ToastProvider` in `App.jsx`. No additional setup is required for new components.

## Examples from the Project

### Email Copy (About.jsx)
```jsx
const handleEmailCopy = async () => {
  try {
    await navigator.clipboard.writeText(personalInfo.email);
    showCopySuccess('Email');
  } catch (error) {
    showCopyError();
  }
};
```

This creates a seamless user experience with immediate feedback when copying email addresses.
