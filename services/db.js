//db connection

//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/Event', {
    useNewUrlParser: true
})

//model defenition
const User = mongoose.model('User',{
    
    name: String,
    userid: String,
    password: Number,
    event: []
})

module.exports ={
    User
}