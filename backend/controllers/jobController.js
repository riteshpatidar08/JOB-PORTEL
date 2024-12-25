import Job from '../models/Jobmodel.js';
import User from '../models/Usermodel.js';
import { sendSuccess } from '../utils/response.js';

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    if (!job) {
      return res.status(400).json({
        message: 'Something went wrong',
      });
    }

    sendSuccess('New job is succesfully created', job, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const { requirement, location } = req.query;
    console.log(requirement);
    console.log(requirement.split(','));
    const query = {
      ...(requirement && { requirement: { $in: requirement.split(',') } }),
      ...(location && { location: { $regex: location } }),
    };

    const jobs = await Job.find(query);
    if (jobs) sendSuccess('Jobs fetched Successfully', jobs, req);
  } catch (error) {}
};

export { createJob, getJobs };

