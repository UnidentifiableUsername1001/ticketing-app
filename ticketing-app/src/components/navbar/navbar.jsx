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
        <nav className='bg-bgMain'>
            <div className='p-3'>
                <img className='h-6' src='/assets/wise_logo_primary.svg'></img>
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

                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;