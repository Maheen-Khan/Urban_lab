import express from 'express';
import {
    createRequest,
    getRequest,
    getAllRequest,
    getAllUserRequest,
    updateRequest,
    deleteRequest
} from '../controllers/requestController.js';
import authMiddleware from '../middleware/auth.js';

const requestRouter = express.Router();

// Create a request
requestRouter.post("/create", authMiddleware, createRequest);

// Get all requests for a specific user
requestRouter.get("/user/:userId", authMiddleware, getAllUserRequest);

// Get a specific request by ID
requestRouter.get("/:requestId", authMiddleware, getRequest);

// Get all requests (admin only)
requestRouter.get("/", authMiddleware, getAllRequest);

// Update a request
requestRouter.put("/:id", authMiddleware, updateRequest);

// Delete a request
requestRouter.delete("/:id", authMiddleware, deleteRequest);

export default requestRouter;
