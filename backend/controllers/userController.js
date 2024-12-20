import User from './../models/Usermodel.js';
import { sendSuccess } from '../utils/response.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

const Signup = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
      req.body;

    //check if user already registered ;
    const alreadyRegistered = await User.findOne({ email });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: 'User already exists ,Please login',
      });
    }

    const hashedPassword = hashPassword(password);

    let userData = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    };

    if (role === 'jobseeker')
      userData.jobseeker = {
        ...jobseeker,
        resume: req.file ? req.file.path : null,
      };

    if (role === 'recruiter') userData.recruiter = recruiter;

    const user = await User.create(userData);

    if (user) {
      return res.status(200).json({
        message: `${user.role} is successfully created`,
      });
    }
  } catch (error) {}
};

const Login = async (req, res) => {
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
    token,
  });
};

export { Signup, Login };
