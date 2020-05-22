//Express is the node js web frame work
const express = require('express');
//Not needed in newer version of express
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const User = require('./models/user.model');
const Exercise = require('./models/exercise.modal');
require('dotenv').config();
//creating express server
const app = express();
const port = process.env.PORT || 5000;
//cors middleware
app.use(cors());
//Because our server is going to use  JSON
app.use(express.json());

//Establishing the connection using mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Atlas server established successfully");
});


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



//this is the point where the actual server starts
app.listen(port,()=>{
  console.log(`App running on port: ${port}`);
});