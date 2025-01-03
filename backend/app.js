import express from 'express';
//NOTE using .env file variable in our app.js
import dotenv from 'dotenv';
import dbConnect from './db/dbConfig.js';
import {router as UserRoutes} from './routes/userRoutes.js';
import {router as JobRoutes} from './routes/jobRoutes.js'
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//NOTE function to connect with mongodb
dbConnect();



app.use('/api', UserRoutes);
app.use('/api',JobRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}  port`);
});
