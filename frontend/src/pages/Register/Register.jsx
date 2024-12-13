// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStored } from '../../Context/StoredContext'; 
import './Register.css'; // Import the updated CSS
import NavBarIntro from '../../components/NavBarIntro/NavBarIntro';

const RegisterPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        homeAddress: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useStored(); // Using StoredContext
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onRegister = async (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/api/user/register";

        try {
            const response = await axios.post(url, data);

            if (response.data.success) {
                const userData = {
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token,
                };

                login(userData); // Update StoredContext
                setSuccessMessage("Registration successful!");
                toast.success("Registration successful!");
                navigate("/my-samples"); // Redirect to My Samples page
            } else {
                setErrorMessage(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
            console.error("Registration error:", error); // Optional: Log the error for debugging
        }
    };

    return (
        <div>
            <NavBarIntro /> 
        <div className="register-page"> {/* Updated class name */}
            <div className="register-container"> {/* Updated class name */}
                <div className="register-title"> {/* Updated class name */}
                    <h2>Create an Account</h2>
                </div>
                <form onSubmit={onRegister} className="register-form"> {/* Optional: Add a form-specific class if needed */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    
                    <div className="register-inputs"> {/* Updated class name */}
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={data.email}
                            onChange={onChangeHandler}
                            required
                        />
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={data.password}
                            onChange={onChangeHandler}
                            required
                        />
                        <input
                            name="homeAddress"
                            placeholder="Home Address"
                            value={data.homeAddress}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default RegisterPage;
