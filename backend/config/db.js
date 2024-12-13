import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://maheen:Mkhan@soilcluster.z4y2d.mongodb.net/test');
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
};



// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.