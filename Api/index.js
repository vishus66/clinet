const express = require('express')
const app = express()
const cors = require('cors')
const routes = require("./Routers/Routes")



app.use(cors())
app.use("/api",routes)
app.use(express.json())
app.use("./Public",express.static("Public"))

require("./dConnect")
app.listen(8000,()=>{
    console.log("Server was listen at http://localhost:8000/")
})