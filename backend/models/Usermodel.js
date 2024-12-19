import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  role: {
    type: String,
    enum: ['jobseeker', 'recruiter', 'admin'],
    default: 'jobseeker',
  },
  jobseeker: {
    education: [
      {
        degree: {
          type: String,
        },
        institution: {
          type: String,
        },
        year: {
          type: Number,
        },
      },
    ],
    experiance: [
      {
        company: {
          type: String,
        },
        jobRole: {
          type: String,
        },
        duration: {
          type: String,
        },
      },
    ],
    skills: {
      type: [String],
    },
    resume: {
      type: String,
    },
  },
  recruiter: {
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    permissons: [String],
    default: ['post_jobs', 'view_applicants', 'manage_jobs'],
  },
  admin: {
    permissons: [String],
    default: ['manage_jobseekers', 'manage_recruiter'],
  },
});


const User = mongoose.model('User', UserSchema);

export default User;
