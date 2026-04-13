import React, { createContext, useState, useContext, Children } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
            {Children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);