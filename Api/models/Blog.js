const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    category:{type:String},
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String}
},{timestamps:true})

module.exports = mongoose.model("Blog",BlogSchema)