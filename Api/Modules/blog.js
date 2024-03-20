const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"]
    },
    heading:{
        type:String,
        require:[true,"Heading is required"],
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    pic:{
        type:String,
        required:[true,"Pic is required"]
    }
})
const Blog = new mongoose.model("Blog",BlogSchema)
module.exports = Blog