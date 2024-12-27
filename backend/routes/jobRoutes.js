import express from 'express';
import { createJob, getJobs, applyJob, getApplicants } from '../controllers/jobController.js';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';

export const router = express.Router();

router.post('/createjob' , createJob);
router.get('/jobs', getJobs);
router.post('/applyjob',  applyJob);
router.get('/job/:id/applicants',  getApplicants);
