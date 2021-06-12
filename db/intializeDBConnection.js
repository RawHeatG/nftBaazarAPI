const mongoose = require('mongoose');

async function intializeDBConnection() {
    try{
        await mongoose.connect("mongodb+srv://rawheat:CGekQOXgxVyZLxXj@nftbazar.z2do5.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true})

        console.log("Successfully connected to Monogo")
    }catch(error){
        console.error("mongoose connection failed...", error)
    }
}

module.exports = { intializeDBConnection }