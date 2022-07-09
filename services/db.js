//db connection

//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/EventApp', {
    useNewUrlParser: true
})

//model defenition
const user = mongoose.model('user',{
    
    name: String,
    userid: String,
    password:String,
    event: []
})

module.exports ={
    user
}