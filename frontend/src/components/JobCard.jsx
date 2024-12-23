import React from 'react';

const JobCard = ({ job }) => {
  const { title, companyName, location, employment, jobDescription, requirement, experience, salaryRange, isActive } = job;

  return (
    <div className="job-card border p-4 mb-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{companyName}</p>
      <p className="text-gray-500">{location}</p>
      <p className="text-sm font-semibold mt-2">Employment Type: {employment.join(", ")}</p>
      <p className="mt-2">{jobDescription}</p>
      
      <h3 className="font-semibold mt-4">Requirements:</h3>
      <ul className="list-disc pl-5">
        {requirement.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <p className="mt-2">Experience Required: {experience}</p>
      <p className="mt-2">Salary Range: ${salaryRange.min} - ${salaryRange.max}</p>
      <p className="mt-2 text-green-500 font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

const JobList = () => {

  const jobs = [
    {
      _id: '1',
      title: 'Full Stack Developer',
      companyName: 'Buddy Tech Solutions',
      location: 'New York, NY',
      employment: ['Full-time'],
      jobDescription: 'We are looking for a passionate full stack developer to join our team. You will be working on both front-end and back-end tasks.',
      requirement: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      experience: '1-2 years',
      salaryRange: {
        min: 60000,
        max: 90000,
      },
      isActive: true,
    },
    {
      _id: '2',
      title: 'Frontend Developer',
      companyName: 'Buddy Innovations',
      location: 'San Francisco, CA',
      employment: ['Part-time'],
      jobDescription: 'Join our innovative team to create beautiful and responsive web applications. Strong skills in HTML, CSS, and JavaScript required.',
      requirement: ['HTML', 'CSS', 'JavaScript', 'React'],
      experience: 'Freshers',
      salaryRange: {
        min: 40000,
        max: 60000,
      },
      isActive: true,
    },
    {
      _id: '3',
      title: 'Backend Developer',
      companyName: 'Buddy Corp',
      location: 'Remote',
      employment: ['Contract'],
      jobDescription: 'We are seeking an experienced backend developer to manage server-side logic and databases.',
      requirement: ['Node.js', 'Express.js', 'PostgreSQL'],
      experience: '2-3 years',
      salaryRange: {
        min: 70000,
        max: 100000,
      },
      isActive: false,
    },
  ];

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
