import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    phoneNumber : {
        type : Number
    },
    role : {
        type : String,
        enum : ['jobseeker', 'recruiter','admin'],
        default : 'jobseeker'

    }
})

const User = mongoose.model('User', UserSchema) ;

export default User ;