import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";

// Archive routes are split out so the homepage bundle stays lean; App wraps the
// Outlet in a Suspense boundary that shows RouteFallback while they load.
const ExperienceArchivePage = lazy(
	() => import("./pages/ExperienceArchivePage")
);
const ProjectArchivePage = lazy(() => import("./pages/ProjectArchivePage"));
const CertificateArchivePage = lazy(
	() => import("./pages/CertificateArchivePage")
);

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "experience", element: <ExperienceArchivePage /> },
			{ path: "projects", element: <ProjectArchivePage /> },
			{ path: "certificates", element: <CertificateArchivePage /> },
			// Unknown URLs fall back to the homepage instead of a 404 page.
			{ path: "*", element: <Navigate to="/" replace /> }
		]
	}
]);

export default router;
