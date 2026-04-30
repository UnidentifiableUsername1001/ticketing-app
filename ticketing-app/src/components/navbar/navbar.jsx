import React from 'react';
import { NavLink, useNavigate } from 'react-router';

function Navbar() {
    const navigat = useNavigate();

    const isAuthenticated = !!sessionStorage.getItem('auth-token');
    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        Navigate('/login');
    };

    return (
        <nav className='navbar-container'>
            <div className='navbar-brand'>
                <h2>Ticketing App</h2>
            </div>

            <div className='navbar-links'>
                {isAuthenticated ? (
                    <>
                        <NavLink to='/dashboard' className="nav-item">Dashboard</NavLink>
                        <NavLink to="/ticket/create-ticket" className='nav-item'>Create Ticket</NavLink>
                        <button onClick={handleLogout} className='logout-btn'>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-item">Login</NavLink>
                        <NavLink to="/register" className="nav-item">Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;