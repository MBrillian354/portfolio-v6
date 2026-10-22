import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import CustomCursor from "./components/CustomCursor";
import DarkModeToggle from "./components/DarkModeToggle";
import RouteFallback from "./components/RouteFallback";
import ToastProvider from "./components/ToastProvider";

// Shared shell for every route. Page-specific chrome (homepage sections or an
// archive table) renders through the Outlet.
function App() {
	return (
		<ToastProvider>
			<CustomCursor
				gradientStops={12}
				size={1020}
				lightStartColor="#fff"
				lightEndColor="#8cb4ff"
				darkStartColor="#101828"
				darkEndColor="#9abbfc"
				gradientDirection="in-to-out"
				hoverScale={1}
				fadeStops={[15, 15, 45]}
				opacityStops={[0.15, 0.1, 0.02, 0.000001]}
				hoverOpacityBoost={0}
				transitionDuration={0}
			/>

			<ScrollRestoration />

			<Suspense fallback={<RouteFallback />}>
				<Outlet />
			</Suspense>

			{/* Floating Dark Mode Toggle */}
			<DarkModeToggle floating={true} />
		</ToastProvider>
	);
}

export default App;
