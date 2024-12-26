import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  companyName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: String,
  },
  employment: {
    type: [String],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  jobDescription: {
    type: String,
  },
  requirement: {
    type: [String],
  },
  experience: {
    type: String,
    enum: ['Freshers', '1-2 years', '2-3 years', '3+ years'],
    required: true,
  },
  salaryRange: {
    type: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
 applicants : [{
  userId : {type : mongoose.Schema.Types.ObjectId , ref : 'User'} ,
  status : {type : String , enum : ['Pending' ,  'Accepted' , 'Rejected'], default : 'Pending'},
  resume : {type : String}
 }],
 postedBy : {type : Date , default : Date.now()}
  
 
});

const Job = mongoose.model('Job', JobSchema);
export default Job;

//title
//comapnyName => USER
//location
//employment
//jobdescrion
//requirement
//phoneNUMBER => USER
// isActive
