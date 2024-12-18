// authMiddleware.js (example)
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("name email"); // ensure you select name
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        req.user = {
            id: user._id,
            name: user.name,  // now req.user.name is defined
            email: user.email
        };
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;
