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
        message: 'User is not registered , Please Register',
      });
    }

    const isMatchPassword = comparePassword(password, existingUser.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        message: 'Password does not match , Please enter correct password',
      });
    }

    const token = generateToken({
      role: existingUser.role,
      id: existingUser._id,
      name: existingUser.name,
    });

    res.status(200).json({
      message: 'Login Successfull',
      data: token,
    });
  } catch (error) {
    console.error('Error in Signup:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export { Signup, Login };

//step to apply for a job

//Apply now

//Login => userId

//get userId
//get user
//
//Job => jobId
