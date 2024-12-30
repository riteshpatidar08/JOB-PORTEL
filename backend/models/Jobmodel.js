import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  companyName: {
    type: String,
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
    type: String,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
      },
      resume: { type: String },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postedDate: { type: Date, default: Date.now() },
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
