let BlogRouter = require("express").Router()
const multer = require("multer")

const storage  = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"Public/upload/blogimag")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage})
const {createblog,getAllblog,getOneBlog,updateBlog,deleteblog} = require("../controller/blogcontroller")

BlogRouter.post("/",upload.fields([
    {name:"pic",maxCount:1}
]),createblog)
BlogRouter.get("/",getAllblog)
BlogRouter.get("/:_id",getOneBlog)
BlogRouter.put("/:_id",upload.fields([
    {name:"pic",maxCount:1}
]),updateBlog)
BlogRouter.delete("/:id",deleteblog)
module.exports = BlogRouter 