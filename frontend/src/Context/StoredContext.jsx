import React, { createContext, useContext, useState } from "react";

const StoredContext = createContext();

export const StoredProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [pdfPath, setPdfPath] = useState(null); 

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCartItems([]);
        setPdfPath(null);
    };

    const addToCart = (item) => setCartItems((prev) => [...prev, item]);
    const removeFromCart = (testId) => setCartItems((prev) => prev.filter((item) => item.testId !== testId));
    const clearCart = () => setCartItems([]);

    const updatePdfPath = (path) => {
        setPdfPath(path);
    };

    return (
        <StoredContext.Provider
            value={{
                user,
                login,
                logout,
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                pdfPath,
                updatePdfPath
            }}
        >
            {children}
        </StoredContext.Provider>
    );
};

export const useStored = () => useContext(StoredContext);
