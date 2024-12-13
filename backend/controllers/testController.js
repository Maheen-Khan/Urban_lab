import Test from "../models/test.js";

// Add Test
const createTest = async (req, res) => {
    try {
        const test = new Test({
            testName: req.body.testName,
            discription: req.body.discription, // Match Donavins's spelling
            unit: req.body.unit,
            cost: req.body.cost,
        });

        await test.save(); // Save the test to the database
        res.status(200).json({ success: "Success" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: "Error: Test not created" });
    }
};

//Created test with name "testName": "testing again"

// Get a test by ID
const getTest = async (req, res) => {
    const { id, name } = req.query;

    try {
        // Find by ID if `id` query parameter is provided
        if (id) {
            const testById = await Test.findById(id);
            if (testById) {
                return res.status(200).json(testById);
            }
        }

        // Find by name if `name` query parameter is provided
        if (name) {
            const testByName = await Test.findOne({ testName: name });
            if (testByName) {
                return res.status(200).json(testByName);
            }
        }

        return res.status(404).json({ error: "Test not found" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error retrieving test" });
    }
};


// Update a test
const updateTest = async (req, res) => {  //did not test
    try {
        const replacedTest = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!replacedTest) {
            return res.status(404).json({ error: "Test not found" });
        }
        res.status(200).json(replacedTest);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error updating test" });
    }
};

// Delete a test
const deleteTest = async (req, res) => {
    const { id, name } = req.query; // Get `id` or `name` from query parameters

    try {
        let deletedTest;

        // Delete by ID if `id` is provided
        if (id) {
            deletedTest = await Test.findByIdAndDelete(id);
        }
        // Delete by name if `name` is provided
        else if (name) {
            deletedTest = await Test.findOneAndDelete({ testName: name });
        }

        if (!deletedTest) {
            return res.status(404).json({ error: "Test not found" });
        }

        res.status(200).json({ message: "Test deleted successfully", deletedTest });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error deleting test" });
    }
};


// List All Tests
const listTest = async (req, res) => {
    try {
        const tests = await Test.find({});
        res.json({ success: true, data: tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error Fetching Tests" });
    }
};

// List specific test??

//List test by specific user!

export { createTest, listTest, deleteTest, getTest, updateTest };



