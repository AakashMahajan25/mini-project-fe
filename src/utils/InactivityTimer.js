import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityTimer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let logoutTimer;

        const resetLogoutTimer = () => {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => {
                // Logout the user after timeout
                handleLogout()
            }, 60 * 60 * 1000);
        };

        const handleUserActivity = () => {
            resetLogoutTimer();
        };

        // Attach event listeners for user activity
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Start the logout timer
        resetLogoutTimer();

        // Cleanup function
        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [60 * 60 * 1000]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return null;
};

export default InactivityTimer;
