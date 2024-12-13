import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Request from "../models/Request.js";

// Add to user cart
const addToCart = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (user) {
            const { testId, name, price } = req.body;
            user.cartData[testId] = { name, price };
            await user.save();
            res.status(200).json({ success: "Test added to cart" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding test to cart" });
    }
};

// Remove from user cart
const removeFromCart = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (user) {
            const { testId } = req.body;
            delete user.cartData[testId];
            await user.save();
            res.status(200).json({ success: "Test removed from cart" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error removing test from cart" });
    }
};

// Get user cart
const getCart = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ success: true, cartData: user.cartData });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cart data" });
    }
};

const confirmPurchase = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (user) {
            const tests = Object.entries(user.cartData).map(([testId, testDetails]) => ({
                testId,
                ...testDetails, // Includes name and price
            }));

            // Save the cart data as a new request
            const newRequest = new Request({
                userId: user._id,
                tests,
            });
            await newRequest.save();

            // Clear the user's cart
            user.cartData = {};
            await user.save();

            res.status(200).json({ success: "Purchase confirmed", request: newRequest });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error confirming purchase" });
    }
};


export { addToCart, removeFromCart, getCart, confirmPurchase };
