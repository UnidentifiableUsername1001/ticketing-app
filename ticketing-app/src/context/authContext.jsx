import React, { createContext, useState, useContext, Children } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);