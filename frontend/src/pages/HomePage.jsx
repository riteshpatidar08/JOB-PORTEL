import React, { useState , useEffect } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../../redux/slices/jobSlice';
import { useDispatch , useSelector } from 'react-redux';
function HomePage() {
 const {jobs} = useSelector((state)=>state.job)
console.log(jobs)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [salary, setSalary] = useState('');
  const [technology, setTechnology] = useState('');

  useEffect(()=>{
    dispatch(getJobs())
  },[])
 
 

  
  // const filteredJobs = jobs.filter((job) => {
  //   return (
  //     (search ? job.title.toLowerCase().includes(search.toLowerCase()) : true) &&
  //     (city ? job.city.toLowerCase() === city.toLowerCase() : true) &&
  //     (salary ? job.salary >= salary : true) &&
  //     (technology ? job.technology.toLowerCase() === technology.toLowerCase() : true)
  //   );
  // });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-white font-semibold">Job Listings</h1>
        <p className="text-sm font-medium text-red text-gray-500">Find your next job</p>
      </div>

    
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2  bg-input-field rounded-lg w-1/4"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 text-white bg-input-field rounded-lg w-1/4"
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
          className="p-2 bg-input-field rounded-lg w-1/4"
        />
        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          className="p-2 text-white  bg-input-field rounded-lg w-1/4"
        >
          <option value="">Select Technology</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

    
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
