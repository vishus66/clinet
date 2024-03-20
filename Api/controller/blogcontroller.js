const Blog = require('../Modules/Userblog')
const fs = require("fs")

async function createblog(req,res){
    try {
        let data = new Blog(req.body)
        
        if(req.files.pic){
            data.pic = req.files.pic[0].path
        }
        await data.save()
        res.send({result:"Done",message:"Record is created"})
    } catch (error) {
        if(error.errors.name){
            res.send({result:"Fail",message:error.errors.name.message})
        }
        else if(error.errors.email){
            res.send({result:"Fail",message:error.errors.email.message})
        }
        else if(error.errors.password){
            res.send({result:"Fail",message:error.errors.password.message})
        }
        else if(error.errors.phone){
            res.send({result:"Fail",message:error.errors.phone.message})
        }
        else if(error.errors.username){
            res.send({result:"Fail",message:error.errors.username.message})
        }
        else
        res.send({result:"Fail",message:"Due to some internal sever"})        
    }

}
async function getAllblog(req,res){
    try {
        let data = await Blog.find().sort({_id:-1})
        res.send({result:"Done",data:data}) 
    } catch (error) {
        res.send.status(500)({result:"Fail",message:"Internal server error"})        
    }
}
async function getOneBlog(req,res){
    try {
        let data = await Blog.findOne({_id:req.params._id})
        if(data){
            res.send({result:"Done",data:data})
        }
        else{
            res.status(404).send({result:"Fail",message:"Somethong went Wrong"})
        }
    } catch (error) {   
        res.send({result:"Fail",message:"Internal server error!!!"})               
    }
}

async function updateBlog(req,res){
    try {
        let data = await Blog.findOne({_id:req.params._id});
    if(data){
        data.name = req.body.name ?? data.name
        data.password = req.body.password ?? data.password
        data.email = req.body.email ?? data.email
        data.phone = req.body.phone ?? data.phone
        data.username = req.body.username ?? data.username
        
        if(req.file.pic){
            try {
                fs.unlink(data.pic)
            } catch (error) {              
            }
            data.pic = req.files.pic[0].path;            
        }
    }
    await data.save()
    } catch (error) {
        res.send({result:"Fail",message:"Some Server error"})
    }
}
async function deleteblog(req,res){
    try {
        let data = await Blog.delete(req.params._id)
    await data.save()
    res.send({result:"Done",message:"Blog is deleted"})
    } catch (error) {
        res.send({result:"fail",message:"Internal server is error"})        
    }
}

module.exports = {
    createblog:createblog,
    getAllblog:getAllblog,
    getOneBlog:getOneBlog,
    updateBlog:updateBlog,
    deleteblog:deleteblog
}