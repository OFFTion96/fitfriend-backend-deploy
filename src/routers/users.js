const express = require('express')
const data = require('C:\\Users\\apisa\\Desktop\\nodejs\\final-project-backend\\data.js')
const router = express.Router()
const UsersModel = require('../models/users')

router.get('/',async (req,res)=>{
    const users = await UsersModel.find();
    res.send(users.map((users)=> users.toJSON()))
})
//User Profile (get)
router.get('/:user/information',async (req,res)=>{
    console.log(req.params)
    const findUser = await UsersModel.find({username:req.params.user})
    res.send(findUser)
    
})

router.post('/', async (req,res)=>{
    console.log(req.body)
    // res.status(400).send("test")
    const users = new UsersModel(req.body);
    const validateResult = users.validateSync();
    if(validateResult){
        return res.status(400).send(validateResult)
    }
    await users.save();
    return res.send(users.toJSON())
    
})



module.exports = router