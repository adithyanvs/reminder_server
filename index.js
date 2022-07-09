//server creation for event reminder....
//1. Import express
const express = require('express')
//import jsonwebtoken
const jwt = require('jsonwebtoken')
//import cors
const cors = require('cors')

const dataService = require('./services/dataservice') //used to import dataservices into index.js


//server app creation using express
const app = express()

//cors use in server app
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

//parse JSON data
app.use(express.json())//used to convert requested JSON formate data into string or defined formate

//application specific middleware
const appMiddleware = (req, res, next) => {
    console.log("application specific middleware");
    next()
}
//use middleware in app
app.use(appMiddleware)

//Event viewer server
const jwtMiddleware = (req,res,next) => {
    //fetch token
    try {
        token = req.headers['x-access-token'] //token = req.body.token =>token given in body section or token given in header secion
        //verfy token
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        req.currentuserid = data.currentuserid
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'Please Log In'
        })
    }
}

//1.Register API
app.post('/register', (req, res) => {
    dataService.regiser(req.body.username, req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
//2.Login API 
app.post('/login', (req, res) => {
    //Login solving here....>
    dataService.login(req.body.userid, req.body.pswd,)
    .then(result => {
        res.status(result.statusCode).json(result)
    })   
})
//3.Add event API
app.post('/addevent',jwtMiddleware, (req, res) => {
    //Add event solving here....>
    dataService.addEvent(req.body.userid, req.body.password,req.body.date,req.body.event)
    .then(result => {
        res.status(result.statusCode).json(result)
    })   
})
//4.view event API
app.post('/viewevent',jwtMiddleware, (req, res) => {
    //view event solving here....>
    dataService.viewEvent(req.body.userid)
    .then(result => {
        res.status(result.statusCode).json(result)
    })   
})
//5.Delete event API
app.post('/deleteevent',jwtMiddleware, (req, res) => {
    //Delete solving here....>
    dataService.deleteEvent(req.body.userid)
    .then(result => {
        res.status(result.statusCode).json(result)
    })   
})




//set up port number to the server app
app.listen(3000, () => {
    console.log("Server started at 3000");
})
