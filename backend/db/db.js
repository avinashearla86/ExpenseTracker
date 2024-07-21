const mongoose = require('mongoose')

const dbConfig = async() => {
    const url = process.env.URL
    try{
        await mongoose.connect(url)
        console.log('connected to dbConfig')
    }catch(e){
        console.log('error connecting to db');
    }
}

module.exports = dbConfig