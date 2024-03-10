const mongoose = require('mongoose');


const mongoString = process.env.MongoDB_STRING;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error)=>{
    console.log(error);
});

database.once('connected', ()=>{
    console.log("Database Connected to The MongoDb Server ");
});