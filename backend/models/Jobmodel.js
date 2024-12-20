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
    enum: [Full - time, Part - time, Contract, Internship],
  },
  jobDescription: {
    type: String,
  },
  requirement: {
    type: [String],
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
