const express = require('express');
const {default: mongoose} = require('mongoose')
const app = express()
const usersRouter = require('./src/routers/users')
const activitesRouter = require('./src/routers/activities')
const PORT = 8080;
const cors = require('cors')
const config = require('./config')
var bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '1mb'}));
app.use(cors())
app.use(express.json());

app.use('/users',usersRouter)
app.use('/activities',activitesRouter)


const start= async ()=>{
    await mongoose.connect(config.mongodb.uri,{user: config.mongodb.username,pass:config.mongodb.password,dbName:config.mongodb.dbName});

    await app.listen(PORT,()=>{
        console.log("Hello")    
    })
}

start().catch(err=> console.log(err))

