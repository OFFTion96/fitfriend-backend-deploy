const express = require('express');
const {default: mongoose} = require('mongoose')
const app = express()
const usersRouter = require('./src/routers/users')
const PORT = 8080;
app.use(express.json());
app.use('/users',usersRouter)

const start= async ()=>{
    await mongoose.connect(
        'mongodb+srv://<username>:<password>@sandbox.ctkei.mongodb.net/',{dbName: "final_db_test"}
      );

    await app.listen(PORT,()=>{
        console.log("Hello")    
    })
}

start().catch(err=> console.log(err))

