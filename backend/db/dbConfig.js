import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();
console.log(process.env.MONGODB_URI);

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.blue('MONGODB Connection Successfull'));
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
