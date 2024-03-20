const mongoose = require("mongoose")

const BlogUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"]
    },
    username:{
        type:String,
        required:[true,"Please provide your username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    phone:{
        type:String,
        required:[true,"phone is required"]
    },
    pic:{
        type:String,
        
    },
    password:{
        type: String, 
        required:[true,"Password is required"]
    }


})
const UserBlogBlog = new mongoose.model("UserBlog",BlogUserSchema)
module.exports = UserBlogBlog