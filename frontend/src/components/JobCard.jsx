import React from 'react';
import { MapPin, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/job/${job._id}`}
      className="job-card text-white bg-opacity-70 bg-dark-gray-1 p-3 mb-4 rounded-xl shadow-md w-72"
    >
      <div className="flex gap-3 mb-2  ">
        <span className="text-white bg-input-field font-semibold tracking-wide px-2 py-1 rounded-full text-xs">
          <span className="inline-block mr-1">
            <MapPin size={10} />
          </span>
          {job.location}
        </span>
        <span className="bg-input-field font-semibold text-xs tracking-wide px-2 py-1 rounded-full">
          <span className="inline-block mr-1">
            <IndianRupee size={10} />
          </span>
          {job.salaryRange.min} - {job.salaryRange.max}
        </span>
      </div>

      <h2 className="text-sm text-red tracking-wider font-medium">{job.title}</h2>

      <p className="text-sm font-medium">
        {' '}
        {job?.recruiter?.companyName}
      </p>

      <p className="mt-2 font-medium text-xs">Experience Required: {job.experience}</p>
      <div className="mt-4">
        <button className="w-full bg-red bg-opacity-50 hover:bg-opacity-100 text-white py-2 px-4 rounded-lg font-medium text-xs transition duration-300">
          Apply Now
        </button>
      </div>
    </Link>
  );
};

export default JobCard;
