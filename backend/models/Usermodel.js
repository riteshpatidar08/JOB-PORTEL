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
    select: false,
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
    experience: [
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
  appliedJobs: [
    {
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    },
  ],
});

UserSchema.pre('save', function (next) {
  if (this.role === 'jobseeker') {
    this.recruiter = undefined;
    this.admin = undefined;
  }

  if (this.role === 'recruiter') {
    this.jobseeker = undefined;
    this.admin = undefined;
  }

  if (this.role === 'admin') {
    this.recruiter = undefined;
    this.jobseeker = undefined;
  }

  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
