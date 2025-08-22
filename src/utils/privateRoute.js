import React from 'react'
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { responseInterceptor } from './api';

const PrivateRoute = ({
    component: Component,
}) => {
    const history = useNavigate();
    const location = useLocation();
    // Temporarily disabled for development - bypass auth interceptor
    // responseInterceptor(history)
    const isAuthenticated = localStorage.getItem('token');

    // Temporarily disabled for development - bypass auth check
    // if (isAuthenticated) {
    //     return <Component />
        
    // } else {
    //     return <Navigate
    //         to={"/login"}
    //         replace
    //         state={{ from: location.pathname }}
    //     />
    // }
    
    // Always allow access during development
    return <Component />
}

export default PrivateRoute;
