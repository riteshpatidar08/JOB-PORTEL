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
    const {
      minSalary,
      maxSalary,
      requirement,
      location,
      employment,
      experience,
    } = req.query;

    const query = {
      ...(minSalary &&
        maxSalary && {
          'salaryRange.min': { $gte: parseInt(minSalary) },
          'salaryRange.max': { $lte: parseInt(maxSalary) },
        }),
      ...(location && { location: { $regex: location.trim(), $options: 'i' } }),
      ...(employment && { employment: employment.split(',') }),
      ...(experience && { experience: experience.trim() }),
      ...(requirement && { requirement: { $in: requirement.split(',') } }),
      isActive: true,
    };

    console.log(query);

    const jobs = await Job.find(query)
      .populate('companyName')
      .populate('phoneNumber')
      .populate('email');

    sendSuccess('Jobs fetched successfully', jobs, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const resumePath = user.jobseeker.resume;

    if (!resumePath) {
      return res.status(404).json({
        message: 'No resume found',
      });
    }
    console.log(resumePath);

    const job = await Job.findById(jobId);

    console.log(job);

    if (!job && !job.isActive) {
      return res.status(404).json({
        message: 'No job found aur not active',
      });
    }

    const appliedJob = job.applicants.some((job) => job.userId === userId);
    console.log(appliedJob);
    if (appliedJob) {
      return res.status(400).json({
        message: 'You have already applied for this Job',
      });
    }

    console.log(userId, jobId);

    job.applicants.push({
      userId: userId,
      status: 'Pending',
      resume: resumePath,
    });

    user.appliedJobs.push({
      jobId,
    });

    await job.save();
    await user.save();

    res.status(200).send('Job applied');
  } catch (err) {
    console.log(err);
    res.status(500).send('interval server error');
  }
};

const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const job = await Job.findById(id).populate(
      'applicants.userId',
      'name email'
    );

    res.status(200).json({
      job,
    });
  } catch (error) {}
};

export { createJob, getJobs, applyJob, getApplicants };
