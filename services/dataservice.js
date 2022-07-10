//import jsonwebtoken
const jwt = require('jsonwebtoken')


//impor db.js here
const db = require('./db')

//Register
const regiser = (username, userid, password) => {
    return db.user.findOne({
      userid
    }).then(user => {
      if (user) {
        return {
          status: false,
          message: "Already resgistered...please log in",
          statusCode: 401//unauthorized entity code
        }
      }
      else {
        //insert in db
        const newUser = new db.user({
          name:username,
          userid,
          password,
          event: []
  
        })
        newUser.save()
        return {
          status: true,
          message: "Registered successfully",
          statusCode: 200
        }
      }
  
    })
}  

//login resolve
const login = (userid, password) => {

    return db.user.findOne({
      userid,
      password: password
    }).then(user => {
      if (user) {
        currentUser = user.name
        currentuserid = userid
        //token generation
        token = jwt.sign({
          //store account number inside token
          currentuserid: userid//key value to be stored
        }, 'supersecretkey12345')
  
        return {
          status: true,
          message: "Login Succesful",
          statusCode: 200,//succes code
          currentUser,
          currentuserid,
          token
        }
  
      } else {
        return {
          status: false,
          message: "Invalid Userid or password",
          statusCode: 401//unauthorized entity code
        }
      }
    })
} 
//Add event resolve
const addEvent = (date,event) => {
  // var event = parseInt(event)
  // var date = parseInt(date)
  return db.user.findOne({
    date, event
  }).then(user => {
    if (user) {
       if (userid != req.currentuserid) {
        return {
          status: false,
          message: "permission Denied",
          statusCode: 401
        }
       }
      
      user.event.push({
         type: date,
        event: event
      })
      user.save()
      return {
        status: true,
        message:" Event added Successfully..",
        statusCode: 200//succes code
      }
    } else {
      return {
        status: false,
        message: "Invalid Userid or password",
        statusCode: 401//unauthorized entity code
      }
    }
  })
}

//view event
const viewEvent = (userid) => {
  return db.user.findOne({
    userid
  }).then(user => {
    if (user) {
      return {
        staus: true,
        statusCode: 200,
        event: user.event
      }
    } else {
      return {
        status: false,
        message: "user does not exist!!",
        statusCode: 401
      }

    }
  })
}

//delete event
const deleteEvent = (userid) => {
  return db.user.deleteOne({
    userid
  }).then(user => {
    if (!user) {
      return {
        staus: false,
        message: "operation failed !!!",
        statusCode: 401
      }
    }

    return {
      status: true,
      statusCode: 200,
      message: "Sccessfully Deleted"
    }
  })
}
//export
module.exports = {
    regiser,
    login,
    addEvent,
    viewEvent,
    deleteEvent
  }