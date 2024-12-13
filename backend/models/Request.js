import mongoose from "mongoose";
import Test from "./Test.js";

const requestSchema = new mongoose.Schema({

    userId : {type:mongoose.Schema.Types.ObjectId, requred:true},
    tests:[{testId: {type:mongoose.Schema.Types.ObjectId, ref: "Test"},
            values: [{type:String}]
            }],
    status: {type:String,default:"Pending"},
    createdAt: {type:Date,default:Date.now()},
    updatedAt: Date

});

const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);
export default Request;