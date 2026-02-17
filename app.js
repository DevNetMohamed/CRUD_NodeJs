require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todosRouters = require('./route/todos');
const userRouters = require('./route/users');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(express.static("./static"));

app.use('/todos', todosRouters);
app.use('/users', userRouters);
app.use('/:id', userRouters);


//Database Conniection
async function dbconnection(){
    try{
     await mongoose.connect(process.env.URL);
        console.log("DB is connected");
        
    }catch (error){
        console.log(error);
    }
}

dbconnection();

app.get('/app', (req, res, next)=>{
    res.status(200).send("Hello World");
})

app.listen(port, (req, res)=>{
    console.log(`the server is running in port ${port} `);    
})
