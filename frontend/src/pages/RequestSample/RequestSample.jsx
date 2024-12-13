import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStored } from "../../Context/StoredContext";
import "./RequestSample.css";
import NavBar from "../../components/NavBar/NavBar";

const RequestSample = () => {
    const navigate = useNavigate();
    const { user, cartItems, addToCart, removeFromCart } = useStored();
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/test/list");
                if (response.data.success) {
                    setTests(response.data.data);
                } else {
                    console.error("Failed to fetch tests:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };
        fetchTests();
    }, []);

    const isInCart = (testId) => cartItems.some((item) => item.testId === testId);

    const handleAddToCart = (test) => {
        if (!user) {
            alert("You need to log in to add items to the cart.");
            navigate("/log-in");
            return;
        }

        if (isInCart(test._id)) {
            alert("This test is already in your cart. Please remove it first.");
            return;
        }

        addToCart({ testId: test._id, name: test.testName, price: test.cost });
    };

    const handleRemoveFromCart = (testId) => {
        removeFromCart(testId);
    };

    const handleProceedToCheckout = () => {
        if (!user) {
            alert("You need to log in to proceed to checkout.");
            navigate("/log-in");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        navigate("/checkout");
    };

    return (
        <div>
            <NavBar />
            <div className="request-sample-page">
                <div className="test-list">
                    <h2>Available Tests</h2>
                    {tests.map((test) => (
                        <div key={test._id} className="test-item">
                            <div className="test-details">
                                <h3>{test.testName}</h3>
                                <p>{test.discription || "No description available"}</p>
                                <span>${test.cost.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => handleAddToCart(test)}
                                disabled={isInCart(test._id)}
                                className={`add-to-cart-button ${isInCart(test._id) ? "disabled" : ""}`}
                            >
                                {isInCart(test._id) ? "Already in Cart" : "Add to Cart"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-container">
                    <h2>Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="cart-list">
                            {cartItems.map((item) => (
                                <li key={item.testId} className="cart-item">
                                    <div className="cart-item-details">
                                        <span>{item.name}</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.testId)}
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {cartItems.length > 0 && (
                        <button onClick={handleProceedToCheckout} className="checkout-button">
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestSample;
