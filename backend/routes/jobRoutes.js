import express from 'express';
import {
  createJob,
  getJobs,
  applyJob,
  getApplicants,
  getJobsByCreator,
  getSingleJob,
} from '../controllers/jobController.js';
import protect from '../middleware/protect.js';
import checkRole from '../middleware/checkRole.js';

export const router = express.Router();

router.post('/createjob', protect, checkRole('recruiter', 'admin'), createJob);

router.get('/jobs', getJobs);

router.post('/applyjob', protect, checkRole('jobseeker'), applyJob);

router.get(
  '/job/:id/applicants',
  protect,
  checkRole('recruiter'),
  getApplicants
);
router.get(
  '/job/:userId/creator',
  protect,
  checkRole('recruiter'),
  getJobsByCreator
);

router.get('/job/:jobId/details' , getSingleJob)
