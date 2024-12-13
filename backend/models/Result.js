import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    //References the request
    requestID : {type:mongoose.Types.ObjectId, required: true},

    //Soil parameters
    Lead : Number,
    pH : Number,
    saltContent : Number,
    soilTexture : Number,
    organicContent : Number,
    Pb : Number,
    Zn : Number,
    Cu : Number,
    As : Number,



    discription:String,

    status : {type:String, default: "Pending"},
    createdAt: {type:Date,default:Date.now},
    updatedAt: Date

});

const result = mongoose.model("Results",resultSchema);
module.exports = result;