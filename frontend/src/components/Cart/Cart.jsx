import React, { useEffect, useState } from "react";
import axios from "axios";
import Checkout from "../Checkout/Checkout";
import "./Cart.css";

const Cart = ({ onRemoveFromCart, onConfirmPurchase }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage if it exists
        const storedCart = localStorage.getItem("cartData");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:4000/api/cart/get",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                    // Save cart to localStorage
                    localStorage.setItem("cartData", JSON.stringify(response.data.cartData));
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCart();
    }, []);

    const handleConfirmPurchase = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/request/create",
                { tests: cartItems },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Purchase confirmed!");
                // Clear cart on backend
                await axios.post(
                    "http://localhost:4000/api/cart/clear",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setCartItems([]); // Clear cart in UI
                localStorage.removeItem("cartData"); // Clear cart in localStorage
                setShowCheckout(false);
            } else {
                alert("Failed to confirm purchase. Please try again.");
            }
        } catch (error) {
            console.error("Error confirming purchase:", error);
            alert("An error occurred while confirming your purchase. Please try again.");
        }
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in your cart</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.testId} className="cart-item">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">${item.price.toFixed(2)}</span>
                            <button
                                className="remove-button"
                                onClick={() => {
                                    axios.post(
                                        "http://localhost:4000/api/cart/remove",
                                        { testId: item.testId },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            },
                                        }
                                    );
                                    setCartItems((prev) => {
                                        const updatedCart = prev.filter((i) => i.testId !== item.testId);
                                        localStorage.setItem("cartData", JSON.stringify(updatedCart));
                                        return updatedCart;
                                    });
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <button
                        className="checkout-button"
                        onClick={() => setShowCheckout(true)}
                    >
                        Checkout
                    </button>
                </div>
            )}

            {showCheckout && (
                <Checkout
                    cartItems={cartItems}
                    setShowCheckout={setShowCheckout}
                    handleConfirmPurchase={handleConfirmPurchase}
                />
            )}
        </div>
    );
};

export default Cart;
