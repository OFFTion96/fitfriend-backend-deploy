require('dotenv').config()
const config = {
    port: process.env.PORT || 8000,
    mongodb:{
        username:process.env.MONGODB_USERNAME,
        password:process.env.MONGODB_PASSWORD

    }
}
module.exports = config