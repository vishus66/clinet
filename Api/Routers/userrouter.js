let UserRouter = require("express").Router()
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
const {createuserblog,getAlluserblog,getOneuserBlog,updateuserBlog,deleteuserblog} = require("../controller/Usercontroller")

UserRouter.post("/",upload.fields([
    {name:"pic",maxCount:1}
]),createuserblog)
UserRouter.get("/",getAlluserblog)
UserRouter.get("/:_id",getOneuserBlog)
UserRouter.put("/:_id",upload.fields([
    {name:"pic",maxCount:1}
]),updateuserBlog)

UserRouter.delete("/:id",deleteuserblog)

module.exports = UserRouter 