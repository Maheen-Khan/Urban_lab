import React from "react";
import { Navigate } from "react-router-dom";
import { useStored } from "../Context/StoredContext"; 

const ProtectedRoute = ({ children }) => {
    const { user } = useStored(); 

    if (!user) {
        return <Navigate to="/log-in" />;
    }

    return children;
};

export default ProtectedRoute;
