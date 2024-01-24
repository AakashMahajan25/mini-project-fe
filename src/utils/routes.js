import Dashboard from "../screens/dashboard/Dashboard";
import DiscoverCorrelation from "../screens/discoverCorrelation/DiscoverCorrelation";
import FrruitGPT from "../screens/frruitGPT/FrruitGPT";
import Profile from "../screens/profile/Profile";

export const loginRoutes = [
    {
        path: "/",
        exact: true,
        element: <Dashboard />,
    },
    {
        path: "/dashboard",
        exact: true,
        element: <Dashboard />,
    },
    {
        path: "/frruit_gpt",
        exact: true,
        element: <FrruitGPT />,
    },
    {
        path: "/discover_correlation",
        exact: true,
        element: <DiscoverCorrelation />,
    },
    {
        path: "/profile",
        exact: true,
        element: <Profile />,
    },
]