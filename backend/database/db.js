const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to Database ");
    } catch (e) {
        console.log("Error while connecting database",e);
        process.exit(1);
    }

}

module.exports=connectToDB;