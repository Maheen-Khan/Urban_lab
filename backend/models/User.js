import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type:String, default: 'user'},
    cartData:{type: Map,
        of: Object, // Stores items as key-value pairs (e.g., testId: { name, price })
        default: {},},
    homeAddress: {type:String, required: true},
    createdAt: {type:Date, default: Date.now()},
    updatedAt: {type:Date}
}, { minimize: false })

const User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;