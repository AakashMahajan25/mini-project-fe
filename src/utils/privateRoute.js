import React from 'react'
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { responseInterceptor } from './api';

const PrivateRoute = ({
    component: Component,
}) => {
    const history = useNavigate();
    const location = useLocation();
    responseInterceptor(history)
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
        return <Component />
        
    } else {
        return <Navigate
            to={"/login"}
            replace
            state={{ from: location.pathname }}
        />
    }
}

export default PrivateRoute;
