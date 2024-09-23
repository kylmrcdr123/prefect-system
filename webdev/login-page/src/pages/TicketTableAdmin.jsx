import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketTableAdmin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const exp = localStorage.getItem('exp');

        // Check if the token exists and is not expired
        if (!token || !exp || Date.now() >= exp * 1000) {
            console.log('Token is missing or expired. Redirecting to login...');
            navigate('/login'); // Redirect to login page if token is not valid
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('exp');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenDecoded');
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div>
            <h1>Admin Ticket Table</h1>
            {/* Your table implementation here */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default TicketTableAdmin;
