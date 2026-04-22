import React from 'react'
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { responseInterceptor } from './api';

const PrivateRoute = ({
    component: Component,
}) => {
    const history = useNavigate();
    const location = useLocation();

    responseInterceptor(history);

    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

    return <Component />
}

export default PrivateRoute;
