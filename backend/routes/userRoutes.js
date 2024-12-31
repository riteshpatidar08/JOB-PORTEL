import { Signup, Login , getSingleUser } from "../controllers/UserController.js";


import express from 'express' ;
import upload from '../middleware/upload.js'
import protect from "../middleware/protect.js";
import checkRole from "../middleware/checkRole.js";
export const router = express.Router() ;


router.post('/register', upload.single('resume'),  Signup) ;
router.post('/login',   Login) ;
router.get('/getuser' , protect , checkRole('recruiter', 'jobSeeker') , getSingleUser )

