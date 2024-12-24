// auth = Bearer elkjwroie3424324390804fdsjkdsfdslkfjdlk
import jwt from 'jsonwebtoken';
import User from '../models/Usermodel.js';

const protect = async (req, res, next) => {

  const auth =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiam9ic2Vla2VyIiwiaWQiOiI2NzYzY2FhZjYwNWQ1NmViZTFkOTg5MDkiLCJuYW1lIjoicml0ZXNoIiwiaWF0IjoxNzM1MDIzMzMzLCJleHAiOjE3MzY3NTEzMzN9.LD6sqpWB0bAu1KlfWwGGd4kzXsV0yvFG5NQJaHHRrCo';
    
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    console.log(token);
    const { id } = jwt.verify(token, 'hello-this-is-my-secret-string');
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      next();
    }
  } else {
    return res.status(404).json({
      message: 'No token found',
    });
  }
};

export default protect;
