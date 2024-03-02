


const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ConnectToDB = mongoose.connect(process.env.MONGO_URl).then(() => {
    console.log("Connected to MongoDB");
});


module.exports = ConnectToDB;