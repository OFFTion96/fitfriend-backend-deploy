require('dotenv').config()
const config = {
    port: process.env.PORT || 8080,
    mongodb:{
        uri:process.env.MONGODB_URI,
        username:process.env.MONGODB_USERNAME,
        password:process.env.MONGODB_PASSWORD,
        dbName:process.env.MONGODB_NAME
        
    }
}
module.exports = config