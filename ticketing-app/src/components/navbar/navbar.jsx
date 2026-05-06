import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAppContext } from '../../context/authContext';

function Navbar() {
    const navigate = useNavigate();

    const isAuthenticated = !!sessionStorage.getItem('auth-token');
    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        navigate('/login');
    };

    return (
        <nav className='bg-bgMain flex flex-row items-center p-3 justify-between'>
            <div className=''>
                <img className='h-6' src='/assets/wise_logo_primary.svg'></img>
            </div>
            <div className='flex w-full justify-center gap-12'>
                {isAuthenticated ? (
                    <>
                            <NavLink to='/dashboard' className="nav-item">
                                Dashboard
                            </NavLink>
                            <NavLink to="/create-ticket" className='nav-item'>
                                Create Ticket
                            </NavLink>
                            <button onClick={handleLogout} className='nav-item'>Logout</button>
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