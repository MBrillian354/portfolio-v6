import { useState, useCallback, useMemo } from "react";
import { ToastContext } from "../context/toastContext";
import Toast from "./Toast";

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, type = "info", duration = 3000) => {
		const id = Date.now() + Math.random();
		const newToast = { id, message, type, duration };

		setToasts((prev) => [...prev, newToast]);
		return id;
	}, []);

	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const showSuccess = useCallback(
		(message, duration) => {
			return addToast(message, "success", duration);
		},
		[addToast]
	);

	const showError = useCallback(
		(message, duration) => {
			return addToast(message, "error", duration);
		},
		[addToast]
	);

	const showWarning = useCallback(
		(message, duration) => {
			return addToast(message, "warning", duration);
		},
		[addToast]
	);

	const showInfo = useCallback(
		(message, duration) => {
			return addToast(message, "info", duration);
		},
		[addToast]
	);

	// Memoized so consumers of useToast() get a stable value between renders.
	const value = useMemo(
		() => ({
			addToast,
			removeToast,
			showSuccess,
			showError,
			showWarning,
			showInfo
		}),
		[addToast, removeToast, showSuccess, showError, showWarning, showInfo]
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{/* Toast Container */}
			<div className="toast-portal">
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						id={toast.id}
						message={toast.message}
						type={toast.type}
						duration={toast.duration}
						onRemove={removeToast}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export default ToastProvider;
