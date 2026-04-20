import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/authContext';

const ProtectedRoute = ({children}) => {
    const {isLoggedIn} = useAppContext();

    if (!isLoggedIn) {
        return <Navigate to="/app/login" replace />;
    }

    return children;
};

export default ProtectedRoute;