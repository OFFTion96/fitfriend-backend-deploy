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
    var date_start = new Date(myQuery.date_start)
    var date_end = new Date(myQuery.date_end)
    date_start.setHours(30,59,59)
  
    // console.log(date_start)
    // console.log(date_end)
    const activities = await activitiesModel.find({$and:[{date_post:{$lte:date_start}},{date_post:{$gt:date_end}},{"username_id":myParams}]}).sort ( { date_post: -1 } );
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