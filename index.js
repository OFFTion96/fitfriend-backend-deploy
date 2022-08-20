const express = require('express');
const {default: mongoose} = require('mongoose')
const app = express()
const usersRouter = require('./src/routers/users')
const activitesRouter = require('./src/routers/activities')
const PORT = 8080;
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/users',usersRouter)
app.use('/activites',activitesRouter)

var myDate = new Date("2016-05-18T16:00:00Z")


const start= async ()=>{
    await mongoose.connect(
        'mongodb+srv://@sandbox.ctkei.mongodb.net/',{dbName: "final_db_test"}
      );

    await app.listen(PORT,()=>{
        console.log("Hello")    
    })
}

start().catch(err=> console.log(err))

