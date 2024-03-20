const UserBlog = require('../Modules/Userblog')
const fs = require("fs")
var passwordValidator = require('password-validator');
const bcrypt = require("bcrypt");
const { error } = require('console');
var schema = new passwordValidator();
// Here is the schema
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

async function createuserblog(req, res) {
    if (req.body.password && schema.validate(req.body.password)) {
        let data = new UserBlog(req.body)
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error) {                
                res.status(500).send({ result: "Fail", message: "Internal server error" });
            }
            else {
                try {
                    if (req.files.pic) {
                        data.pic = req.files.pic[0].path
                    }
                    data.password = hash
                    await data.save()
                    res.send({ result: "Done", message: "Record is created" })

                } catch (error) {
                    if (error.keyValue && error.keyValue.username){
                        res.send({result:"Fail",message:"Duplicate can not allow"})
                    }
                    else if (error.errors.name) {
                        res.send({ result: "Fail", message: error.errors.name.message })
                    }
                    else if (error.errors.email) {
                        
                        res.send({ result: "Fail", message: error.errors.email.message })
                    }
                    else if (error.errors.description) {
                        res.send({ result: "Fail", message: error.errors.description.message })
                    }
                    else if (error.errors.phone) {
                        res.send({ result: "Fail", message: error.errors.phone.message })
                    }
                    else if (error.errors.username) {
                        res.send({ result: "Fail", message: error.errors.username.message })
                    }
                    else
                        res.send({ result: "Fail", message: "Due to some internal sever" })
                }
            }
        })

    }
    else
        res.send({ result: "Fail", message: "Password Must Contains Following Items 1. Minimum length 8 2. Maximum length 20 3. Must have 1 uppercase letters 4. Must have 1 lowercase letters 5. Must have at least 1 digits 6. Should not have spaces" })


}
async function getAlluserblog(req, res) {
    try {
        let data = await UserBlog.find().sort({ _id: -1 })
        res.send({ result: "Done", data: data })
    } catch (error) {
        console.log(error)
        res.send({ result: "Fail", message: "Internal server error" })
    }
}
async function getOneuserBlog(req, res) {
    try {
        let data = await UserBlog.findOne({ _id: req.params._id })
        if (data) {
            res.send({ result: "Done", data: data })
        }
        else {
            res.status(404).send({ result: "Fail", message: "Somethong went Wrong" })
        }
    } catch (error) {
        res.send({ result: "Fail", message: "Internal server error!!!" })
    }
}

async function updateuserBlog(req, res) {
    try {
        let data = await UserBlog.findOne({ _id: req.params._id });
        if (data) {
            data.name = req.body.name ?? data.name
            data.heading = req.body.heading ?? data.heading
            data.description = req.body.heading ?? data.description
            if (req.file.pic) {
                try {
                    fs.unlink(data.pic)
                } catch (error) {
                }
                data.pic = req.files.pic[0].path;
            }
        }
        await data.save()
    } catch (error) {
        res.send({ result: "Fail", message: "Some Server error" })
    }
}
async function deleteuserblog(req, res) {
    try {
        let data = await UserBlog.delete(req.params._id)
        await data.save()
        res.send({ result: "Done", message: "UserBlog is deleted" })
    } catch (error) {
        res.send({ result: "fail", message: "Internal server is error" })
    }
}

module.exports = {
    createuserblog: createuserblog,
    getAlluserblog: getAlluserblog,
    getOneuserBlog: getOneuserBlog,
    updateuserBlog: updateuserBlog,
    deleteuserblog: deleteuserblog
}