const mongoose = require('mongoose');

async function initializeDBConnection() {
    try{
        await mongoose.connect("mongodb+srv://rawheat:CGekQOXgxVyZLxXj@nftbazar.z2do5.mongodb.net/nftbaazar", {useNewUrlParser: true, useUnifiedTopology: true})

        console.log("Successfully connected to Monogo")
    }catch(error){
        console.error("Mongoose connection failed...", error)
    }
}

module.exports = { initializeDBConnection }