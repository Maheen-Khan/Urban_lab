import React from "react";
import "./Cart.css";
import Checkout from "../../components/Checkout/Checkout"; // Correct import


const Cart = ({ cartItems, onRemoveFromCart, onConfirmPurchase }) => {
    // Calculate the total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

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
                                onClick={() => onRemoveFromCart(item.testId)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <>
                    <div className="cart-footer">
                        <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
                        <button className="checkout-button" onClick={onConfirmPurchase}>
                            Confirm Purchase
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
