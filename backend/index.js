const express = require("express");
const ConnectToDB = require("./db");
const cors = require("cors");



const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// database connection 
ConnectToDB;




app.use('/api/v1',require('./routes/APIv1/index'))



app.listen(3000, () => { console.log("App is listening on port 3000"); });


