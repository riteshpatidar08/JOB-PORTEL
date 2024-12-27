import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaMoneyBillWave } from 'react-icons/fa';  

const JobCard = ({ job }) => {


  return (
    <div className="job-card text-white bg-dark-gray-1  p-5 mb-4 rounded-xl shadow-md">
      <h2 className="text-md text-red font-semibold">{job.title}</h2>
       <p className="text-gray-600 text-sm">{job.companyName.recruiter.companyName}</p>
    
      
      <div className="flex items-center mt-2">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <p className="text-gray-500">{job.location}</p>
      </div>

      {/* <div className="flex items-center mt-2">
        <FaRegClock className="text-gray-500 mr-2" />
        <p className="text-sm font-semibold">Employment Type: {employment.join(", ")}</p>
      </div> */}
      
      <p className="mt-2">{job.jobDescription}</p>
      
     

      <p className="mt-2">Experience Required: {job.experience}</p>
      
      {/* <div className="flex items-center mt-2">
        <FaMoneyBillWave className="text-gray-500 mr-2" />
        <p className="mt-2">Salary Range: ${salaryRange.min} - ${salaryRange.max}</p>
      </div> */}
      
      {/* <p className="mt-2 text-green-500 font-semibold">{isActive ? 'Active' : 'Inactive'}</p>  */}
    </div>
  );
};


export default JobCard
