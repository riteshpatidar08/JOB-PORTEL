import express from 'express' ;
import { createJob,getJobs } from '../controllers/jobController.js';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';
export const router = express.Router()


router.post('/createjob', protect, checkRole('jobseeker'), createJob)
router.get('/jobs', protect, checkRole('jobs') ,  getJobs)






