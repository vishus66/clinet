const mongoose = require("mongoose")

function getconnection(){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/Blog-cart")
        console.log("Server is connected")
    }
    catch(error){
        console.log(error)
    }
}
getconnection()
 