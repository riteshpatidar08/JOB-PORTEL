import express from 'express' ;
//NOTE using .env file variable in our app.js
import dotenv from 'dotenv' ;
import dbConnect from './db/dbConfig.js';
dotenv.config()

const app = express() ;
//NOTE function to connect with mongodb
dbConnect() ;
console.log(process.env.PORT)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}  port`)
})

