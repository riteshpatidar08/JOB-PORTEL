import React, { useState } from 'react';
import JobCard from '../components/JobCard';

function HomePage() {
 
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [salary, setSalary] = useState('');
  const [technology, setTechnology] = useState('');

 
  const jobs = [
    { id: 1, title: 'Frontend Developer', city: 'New York', salary: 70000, technology: 'React' },
    { id: 2, title: 'Backend Developer', city: 'San Francisco', salary: 90000, technology: 'Node.js' },
    { id: 3, title: 'Full Stack Developer', city: 'Los Angeles', salary: 80000, technology: 'JavaScript' },
    { id: 4, title: 'React Developer', city: 'New York', salary: 75000, technology: 'React' },
    { id: 5, title: 'Node.js Developer', city: 'Chicago', salary: 85000, technology: 'Node.js' },
  ];

  
  const filteredJobs = jobs.filter((job) => {
    return (
      (search ? job.title.toLowerCase().includes(search.toLowerCase()) : true) &&
      (city ? job.city.toLowerCase() === city.toLowerCase() : true) &&
      (salary ? job.salary >= salary : true) &&
      (technology ? job.technology.toLowerCase() === technology.toLowerCase() : true)
    );
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Job Listings</h1>
        <p className="text-sm font-medium text-gray-500">Find your next job</p>
      </div>

    
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        >
          <option value="">Select City</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <input
          type="number"
          placeholder="Min Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        />
        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        >
          <option value="">Select Technology</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
