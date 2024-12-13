import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStored } from "../../Context/StoredContext";
import "./Checkout.css";

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { user, updatePdfPath } = useStored();
    const navigate = useNavigate();
    
    // Add a mock name and price for demonstration
    const cartItems = [
        { testId: "67533067d6481cb08bfdbd29", values: [], name: "Lead, pH", price: 70 }
    ];

    // Calculate cart total
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

    const handleConfirmPurchase = async () => {
        if (!user) {
            alert("You need to log in");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        const requestData = {
            userId: user.id,
            tests: cartItems.map(item => ({ testId: item.testId, values: item.values })),
            address,
            phoneNumber
        };

        try {
            const response = await fetch("http://localhost:4000/api/request/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log("Server response:", data);

            if (data.success) {
                alert("Request created successfully!");
                updatePdfPath(data.pdfPath);
                navigate("/order");
            } else {
                alert(data.message || "Failed to create request.");
            }
        } catch (error) {
            console.error("Error confirming purchase:", error);
            alert("An error occurred while confirming your purchase.");
        }
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-cart">
                <h2>Order Summary</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.testId}>
                            {item.name}: ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${cartTotal.toFixed(2)}</h3>
            </div>

            <div className="checkout-form">
                <label>
                    Address:
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                </label>
                <button onClick={handleConfirmPurchase} className="confirm-button">
                    Confirm Purchase
                </button>
            </div>
        </div>
    );
};

export default Checkout;
