import Test from "../models/Test.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import generatePDF from "../Utils/generatePDF.js";


const createRequest = async (req, res) => {
    try {
        const { tests, address, phoneNumber } = req.body;

        // Log the incoming request
        console.log("Incoming request body:", req.body);

        // Check for missing fields
        if (!tests || tests.length === 0) {
            console.error("Tests field is missing or empty.");
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }
        if (!address) {
            console.error("Address is missing.");
            return res.status(400).json({ success: false, message: "Address is required" });
        }
        if (!phoneNumber) {
            console.error("Phone number is missing.");
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }

        // Create the request
        const newRequest = new Request({
            userId: req.user.id,
            tests,
            status: "Pending",
        });

        await newRequest.save();

        // Generate the mailing slip PDF
        const pdfPath = await generatePDF(newRequest._id, req.user.name, address, phoneNumber);

        res.status(201).json({
            success: true,
            message: "Request created successfully.",
            data: newRequest,
            pdfPath: `/pdfs/${newRequest._id}.pdf`, // Ensure this matches the server route
        });       
    } catch (error) {
        console.error("Error in createRequest:", error);
        res.status(500).json({ success: false, message: "Server error occurred" });
    }
};



// Get all Requests (user)
const getAllUserRequest = async (req, res) => {
    try {
        const requestAll = await Request.find({ userId: req.params.userId }).populate(
            "tests.testId"
        );
        res.status(200).json(requestAll);
    } catch {
        res.status(400).json({ error: "Could not retrieve requests" });
    }
};

// Get a Request (user, admin)
const getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.body.requestId).populate("tests.testId");
        res.status(200).json(request);
    } catch {
        res.status(400).json({ error: "Could not retrieve request" });
    }
};

// Get all Requests (admin)
const getAllRequest = async (req, res) => {
    try {
        const requestAll = await Request.find().populate("tests.testId");
        res.status(200).json(requestAll);
    } catch {
        res.status(400).json({ error: "Could not retrieve requests" });
    }
};

// Update a Request
const updateRequest = async (req, res) => {
    try {
        console.log(req.body.tests);
        const id = req.params.id; // Extract the request ID from the URL parameter
        const { tests, status } = req.body; // Extract the tests and status from the body

        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        await Request.findByIdAndUpdate(req.params.id, { tests: req.body.tests });

        res.status(200).json({ success: "Request updated" });
        Request.findById(req.params.id).then((i) => console.log(i));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the request", error });
    }
};

// Delete a Request
const deleteRequest = async (req, res) => {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (deletedRequest == null) {
        return res.status(400).json({ error: "Could not find sample" });
    }
    res.status(200).json({ message: "Sample Deleted" });
};

// Export all functions
export {
    createRequest,
    getRequest,
    getAllRequest,
    getAllUserRequest,
    updateRequest,
    deleteRequest,
};
