const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema(
    {
        sport: {
            required: true,
            type: String,
          },
          date_add: {
            type: Date,
            required: true,
          },
          date_activites: {
            type: Date,
            required: true,
          },
          time_start: {
            type: Date,
            required: true,
          },
          time_end: {
            type: Date, 
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
          captions: {
            type: String,
            required: true,
          },
          sport_photo: {
            type: String,
            required: true,
          },

    }
)

const activitiesModel = mongoose.model('activites_tests',activitiesSchema)

module.exports = activitiesModel