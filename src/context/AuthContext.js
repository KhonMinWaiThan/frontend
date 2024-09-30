import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Export a custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State for the logged-in user

    const login = (userData) => {
        setUser(userData); // Set the user object when logging in
    };

    const logout = () => {
        setUser(null); // Clear the user object when logging out
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
