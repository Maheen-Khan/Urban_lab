import React, { useState } from 'react';
import './Login.css'; // Update the CSS file name to reflect the new component
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBarIntro from '../../components/NavBarIntro/NavBarIntro';
import { Link, useNavigate } from 'react-router-dom';
import { useStored } from '../../Context/StoredContext'; 

const LoginPage = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const { login } = useStored();
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
        console.log("Updated data:", { ...data, [name]: value });
    };
    

    const onLogin = async (e) => {
        e.preventDefault();
        console.log("Login attempt started...");
    
        const url = "http://localhost:4000/api/user/login";
    
        try {
            const response = await axios.post(url, data);
            console.log("Response received:", response.data);
    
            if (response.data.success) {
                const userData = {
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token,
                };
    
                login(userData); // Update StoredContext
                toast.success("Login successful!");
                console.log("Navigating to /my-samples");
                navigate("/request-sample");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    

    return (
        <div>
            <NavBarIntro />
            <div className="login-page">
            <form onSubmit={onLogin} className="login-container">
                    <div className="login-title">
                        <h2>Login</h2>
                    </div>
                    <div className="login-inputs">
                        <input
                            name="email"
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="Your email"
                            required
                        />
                        <input
                            name="password"
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p className="spaced-paragraph">
                        Don’t have an account?{' '}
                        <Link to="/register" className="register-link">
                            Register Here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
