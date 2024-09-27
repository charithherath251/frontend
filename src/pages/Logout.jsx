import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform the logout action here (e.g., clear token from localStorage)
        localStorage.removeItem('authToken'); // Assuming you store the token in localStorage

        // Optionally clear other user data
        localStorage.removeItem('userData');

        // Redirect to login page after logout
        navigate('/auth/login');
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Logging Out...</h1>
                <p className="text-gray-600">You are being redirected to the login page.</p>
                <div className="mt-4">
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
