import { Signup, Login } from "../controllers/UserController.js";


import express from 'express' ;
import upload from '../middleware/upload.js'
export const router = express.Router() ;


router.post('/register', upload.single('resume'),  Signup) ;
router.post('/login',   Login) ;


