import express from 'express' ;
import { createJob } from '../controllers/jobController.js';

export const router = express.Router()


router.post('/createjob', createJob)





