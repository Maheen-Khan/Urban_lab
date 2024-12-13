import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Restore the user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data to storage
        setUser(userData); // Update context state
    };

    const logout = () => {
        localStorage.removeItem("user"); // Clear user data from storage
        setUser(null); // Clear user state
        window.location.href = "/"; // Redirect to the intro/login page
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
