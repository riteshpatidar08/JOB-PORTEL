import Job from '../models/Jobmodel.js';
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

export { createJob };
