const express = require('express')
const ObjectId = require('mongoose').Types.ObjectId; 
const router = express.Router()

const activitiesModel = require('../models/activities')

router.post('/', async (req,res,next)=>{
  
  
    const activites = new activitiesModel(req.body);

    const validateResult = activites.validateSync();
    if(validateResult){
   
        return res.status(400).send(validateResult)

    }
    await activites.save();

    return res.send(activites.toJSON())
    
 
}

)

router.get('/',async (req,res,next)=>{

  
    const dayPicker = req.query.date
    console.log(dayPicker)
    if (dayPicker === undefined) {
      const activities = await activitiesModel.find({}).sort({date_post: -1});
      res.send(activities);
      
    } else {
      var dateEnd = new Date(dayPicker)
      dateEnd.setHours(30, 59, 59)
      console.log(dateEnd)
      var dateStart = new Date(dayPicker)
      console.log(dateStart)
      console.log("b")
      const activities = await activitiesModel.find({
        $and:
          [{
            "date_post":
              { $lt: (dateEnd) }
          },
          { "date_post": { $gt: (dateStart) } }]
      }).sort({date_post: -1});
      res.send(activities);
  
    }

 
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

router.get('/activity/:sport',async (req, res, next) => {
    const { sport } = req.params
    let date = new Date()
    date.setDate(date.getDate() - 1)
    console.log(date)
   
      const filterSport = await activitiesModel.aggregate([
        { "$match": { date_post: { $gte: date } } },
        { "$match": { sport: sport } },
        { "$project": { "_id": 0 } }
      ])
  
  
      return res.status(200).send(filterSport)
    
  
  })

  router.get('/activity_types/:sport',async (req, res, next) => {
    const { sport } = req.params
    let date = new Date()
    date.setDate(date.getDate() - 1)
    console.log(date)
    try {
      const countNumber = await activitiesModel.aggregate([
        { "$match": { date_post: { $gte: date } } },
        { "$match": { sport: sport } },
        { "$group": { "_id": "$sport", "count": { "$sum": 1 } } },
        { "$project": { "_id": 0 } }
      ])
  
      if (countNumber.length > 0) {
        console.log(typeof countNumber[0].count.toString())
        res.status(200).send(countNumber[0].count.toString());
      } else {
        return res.status(200).send("0");
      }
  
    } catch (error) {
      res.status(400).send(error.message);
    }
  
  }
  )

module.exports = router