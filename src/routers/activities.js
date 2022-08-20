const express = require('express')
ObjectId = require('mongoose').Types.ObjectId; 
const router = express.Router()

const activitiesModel = require('../models/activities')

router.post('/', async (req,res,next)=>{
    console.log(req.body)
   
    

    const activites = new activitiesModel(req.body);

    const validateResult = activites.validateSync();
    if(validateResult){
        return res.status(400).send(validateResult)
    }
    await activites.save();
    return res.send(activites.toJSON())
    
})

router.get('/:user',async (req,res,next)=>{

    const myParams = req.params.user
    const myQuery = req.query
    
    const activities = await activitiesModel.find({username_id:myParams});
    res.send(activities.map((activities)=> activities.toJSON()))
 
})

router.delete('/:acivityid',async(req,res,next)=>{
    const myParams = req.params.acivityid
    console.log(myParams)
    await activitiesModel.deleteOne({_id:ObjectId(myParams),function (err){
        if (!err) {console.log("delete done")}
        else {console.log("not delete")}
    }})
    res.send("delete done")
})



module.exports = router