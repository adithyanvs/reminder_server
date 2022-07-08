//server creation for event reminder....
//1. Import express
const express = require('express')
//server app creation using express
const app = express()
//set up port number to the server app
app.listen(3000, () => {
    console.log("Server started at 3000");
})
