import User from './../models/Usermodel.js';

const Signup = async (req, res) => {
    console.log(req.body)
  const { name, email, password, phoneNumber, role, jobseeker, recruiter } =
    req.body;

  //check if user already registered ;
  const alreadyRegistered = await User.findOne({ email });

  if (alreadyRegistered) {
    return res.status(400).json({
      message: 'User already exists ,Please login',
    });
  }

  let userData = {
    name,
    email,
    password,
    phoneNumber,
    role,
  };

  if (role === 'jobseeker') userData.jobseeker = jobseeker;
  if (role === 'recruiter') userData.recruiter = recruiter;

  const user = await User.create(userData);

  if (user) {
   return res.status(200).json({
      message: `${user.role} is successfully created`,
    });
  }
};


export {
Signup
}