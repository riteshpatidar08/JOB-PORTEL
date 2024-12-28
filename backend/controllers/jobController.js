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
      .select('-applicants')
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

const getSingleJob = async (req, res) => {
  const { jobId } = req.params;

  const singleJob = await Job.findById(jobId);

  if (!singleJob) {
    return res.status(400).json({
      message: 'No job details found',
    });
  }

  sendSuccess('Job Details Successfully fetched', singleJob, res);
};

const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message:
          'User not found. Please ensure you are logged in with a valid account.',
      });
    }

    const resumePath = user.jobseeker.resume;

    if (!resumePath) {
      return res.status(404).json({
        message:
          'No resume found. Please upload your resume in your profile to apply for jobs.',
      });
    }

    console.log('Resume Path:', resumePath);

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message:
          'The specified job could not be found. Please check the job listing.',
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        message:
          'This job is no longer active. Please explore other opportunities.',
      });
    }

    console.log('Job Details:', job);

    const appliedJob = job.applicants.some(
      (job) => job.userId.toString() === userId
    );
    console.log(appliedJob);
    if (appliedJob) {
      return res.status(400).json({
        message: 'You have already applied for this Job',
      });
    }

    

    console.log('Applying for Job:', { userId, jobId });

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

    res.status(200).json({
      message: 'Job application submitted successfully. Best of luck!',
    });
  } catch (err) {
    console.error('Error in applying for job:', err.message);
    res.status(500).json({
      message:
        'An unexpected error occurred while processing your request. Please try again later.',
      error: err.message,
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Job ID:', id);

    const job = await Job.findById(id).populate(
      'applicants.userId',
      'name email'
    );

    if (!job) {
      return res.status(404).json({
        message: 'Job not found. Please ensure the job ID is correct.',
      });
    }

    if (job.applicants.length === 0) {
      return res.status(404).json({
        message: 'No applicants found for this job.',
      });
    }

    res.status(200).json({
      job,
      message: 'Applicants fetched successfully.',
    });
  } catch (error) {
    console.error('Error in fetching applicants:', error.message);
    res.status(500).json({
      message:
        'An unexpected error occurred while retrieving applicants. Please try again later.',
      error: error.message,
    });
  }
};

const getJobsByCreator = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params;

    const jobs = await Job.find({ createdBy: userId }).populate(
      'createdBy',
      'name , email'
    );

    if (!jobs) {
      res.status(404).json({
        message: 'No Job Found',
      });
    }

    sendSuccess('Jobs successfully fetched', jobs, res);
  } catch (error) {
    console.log(error);
  }
};

export {
  createJob,
  getJobs,
  applyJob,
  getApplicants,
  getJobsByCreator,
  getSingleJob,
};
