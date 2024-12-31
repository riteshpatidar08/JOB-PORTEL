import User from './../models/Usermodel.js';
import { sendSuccess } from '../utils/response.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import Job from '../models/Jobmodel.js';

const Signup = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
      req.body;

    const alreadyRegistered = await User.findOne({ email });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: 'User already exists, please login',
      });
    }

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    let userData = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    };

    if (role === 'jobseeker') {
      const parsedJobseekerData = JSON.parse(jobseeker);

      console.log(parsedJobseekerData);
      userData.jobseeker = {
        ...parsedJobseekerData,

        resume: req.file ? req.file.path : null,
      };
    }

    if (role === 'recruiter') {
      userData.recruiter = JSON.parse(recruiter);
    }

    const user = await User.create(userData);

    if (user) {
      return res.status(200).json({
        message: `${user.role} is successfully created`,
      });
    }

    return res.status(500).json({
      message: 'Something went wrong during user creation',
    });
  } catch (error) {
    console.error('Error in Signup:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: 'User is not registered, Please Register',
      });
    }

    console.log(existingUser);
    const isMatchPassword = await comparePassword(
      password,
      existingUser.password
    );

    console.log(isMatchPassword);

    if (!isMatchPassword) {
      return res.status(400).json({
        message: 'Password does not match, Please enter the correct password',
      });
    }

    const token = generateToken({
      role: existingUser.role,
      id: existingUser._id,
      name: existingUser.name,
    });

    const { password: _, ...userData } = existingUser.toObject();

    res.status(200).json({
      message: 'Login Successful',
      data: { token, user: userData },
    });
  } catch (error) {
    console.error('Error in Login:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    console.log('role', req.user.role);

    if (req.user.role === 'recruiter') {
      const user = await User.findById(req.user._id).select(
        '-jobseeker -admin -password'
      );
      sendSuccess('Recruiter details fetched', user, res);
    } else if (req.user.role === 'jobseeker') {
      const user = await User.findById(req.user._id).select(
        '-recruiter -admin -password'
      );
      sendSuccess('jobSeeker details fetched', user, res);
    }
  } catch (error) {}
};

export { Signup, Login, getSingleUser };

//step to apply for a job

//Apply now

//Login => userId

//get userId
//get user
//
//Job => jobId
