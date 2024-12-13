import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/User.js";

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id);

        // Respond with success, token, and user details
        res.json({
            success: true,
            token,
            name: user.name, // Include user's name for frontend display
            email: user.email, // Optional: Include email for additional context
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during login" });
    }
};

//register user
// Updated registerUser function in user controller

// Register user
const registerUser = async (req, res) => {
    const { name, email, password, homeAddress } = req.body;

    try {
        // Check if the user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format & password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Check if home address is provided
        if (!homeAddress || homeAddress.trim() === "") {
            return res.json({ success: false, message: "Please enter a valid home address" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Higher rounds = slower but more secure
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            homeAddress,
        });

        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);

        // Respond with success, token, and user details
        res.json({
            success: true,
            token,
            name: user.name, // Include user's name for frontend
            email: user.email, // Include email for additional context
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during registration" });
    }
};



export {loginUser, registerUser}

