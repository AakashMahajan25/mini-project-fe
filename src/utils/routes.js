import Dashboard from "../screens/dashboard/Dashboard";
import DiscoverCorrelation from "../screens/discoverCorrelation/DiscoverCorrelation";
import FrruitGPT from "../screens/frruitGPT/FrruitGPT";
import Login from "../screens/login/Login";
import MarketContentGPT from "../screens/marketContentGPT/MarketContentGPT";
import Profile from "../screens/profile/Profile";
import Signup from "../screens/signup/Signup";
import PrivateRoute from "./privateRoute";
import Topics from "../screens/selectPreferences/SelectPreferences";
import Market from "../screens/makeSelection/MakeSelection"
import NewsIframe from "../screens/news/NewsIframe";
import LeftBox from "../components/leftBox/LeftBox";

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
        path: "/dashboard/watchlist",
        exact: true,
        element: <PrivateRoute component={LeftBox} />,
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
        path: "/topics",
        exact: true,
        element: <PrivateRoute component={Topics} />,
    },
    {
        path: "/market",
        exact: true,
        element: <PrivateRoute component={Market} />,
    },
    {
        path: "/market-content-gpt",
        exact: true,
        element: <PrivateRoute component={MarketContentGPT} />,
    },
    {
        path: "/news",
        exact: true,
        element: <PrivateRoute component={NewsIframe} />,
    },
]