const routes = require("express").Router()

const blogupload = require("./blog-router")
const userblog = require("./userrouter")
routes.use("/blogupload",blogupload)
routes.use("/userinfo",userblog)

module.exports = routes
