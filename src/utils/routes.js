import Dashboard from "../screens/dashboard/Dashboard";
import DiscoverCorrelation from "../screens/discoverCorrelation/DiscoverCorrelation";
import FrruitGPT from "../screens/frruitGPT/FrruitGPT";
import Login from "../screens/login/Login";
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
        path: "/frruit-gpt",
        exact: true,
        element: <FrruitGPT />,
    },
    {
        path: "/discover-correlation",
        exact: true,
        element: <DiscoverCorrelation />,
    },
    {
        path: "/profile",
        exact: true,
        element: <Profile />,
    },
    {
        path: "/login",
        exact: true,
        element: <Login />,
    },
]