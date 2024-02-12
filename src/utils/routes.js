import Dashboard from "../screens/dashboard/Dashboard";
import DiscoverCorrelation from "../screens/discoverCorrelation/DiscoverCorrelation";
import FrruitGPT from "../screens/frruitGPT/FrruitGPT";
import Login from "../screens/login/Login";
import MarketContentGPT from "../screens/marketContentGPT/MarketContentGPT";
import Profile from "../screens/profile/Profile";
import Signup from "../screens/signup/Signup";
import PrivateRoute from "./privateRoute";

export const loginRoutes = [
    {
        path: "/",
        exact: true,
        element: <Login />,
    },
    {
        path: "/login",
        exact: true,
        element: <Login />,
    },
    {
        path: "/signUp",
        exact: true,
        element: <Signup />,
    },
    {
        path: "/dashboard",
        exact: true,
        element: <PrivateRoute component={Dashboard} />,
    },
    {
        path: "/frruit-gpt",
        exact: true,
        element: <PrivateRoute component={FrruitGPT} />,
    },
    {
        path: "/discover-correlation",
        exact: true,
        element: <PrivateRoute component={DiscoverCorrelation} />,
    },
    {
        path: "/profile",
        exact: true,
        element: <PrivateRoute component={Profile} />,
    },
    {
        path: "/market-content-gpt",
        exact: true,
        element: <PrivateRoute component={MarketContentGPT} />,
    },
]