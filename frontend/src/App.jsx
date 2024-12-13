import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/IntroPage/Intro";
import LoginPage from "./pages/LogIn/Login";
import MySamplesPage from "./pages/MySamples/MySamples";
import RequestSample from "./pages/RequestSample/RequestSample";
import { StoredProvider } from "./Context/StoredContext"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout/Checkout";
import Order from "./pages/Order/Order";
import RegisterPage from "./pages/Register/Register";

const App = () => {
    return (
        <StoredProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Intro />} />
                <Route path="/log-in" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Protected Routes */}
                <Route 
                    path="/my-samples" 
                    element={
                        <ProtectedRoute>
                            <MySamplesPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/request-sample" 
                    element={
                        <ProtectedRoute>
                            <RequestSample />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/checkout" 
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/order" 
                    element={
                        <ProtectedRoute>
                            <Order />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </StoredProvider>
    );
};

export default App;
