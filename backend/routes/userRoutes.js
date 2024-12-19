import { Signup } from "../controllers/UserController.js";


import express from 'express' ;

const router = express.Router() ;


router.post('/register',Signup) ;


export default router ;