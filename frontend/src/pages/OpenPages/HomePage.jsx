import React, { useState, useEffect } from 'react';
import JobCard from '../../components/JobCard';
import { getJobs } from '../../../redux/slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/HeroSection';
import { Checkbox, Group } from '@mantine/core';

function HomePage() {
  const { jobs } = useSelector((state) => state.job);
  console.log(jobs);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const [salaryRange, setSalaryRange] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleSalaryRangeChange = (value) => {
    setSalaryRange((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  const handleRoleChange = (value) => {
    setRoles((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  return (
    <div>
      <Hero />

      <div className="p-6 flex">
        <div className="w-1/4 p-4 bg-dark-gray-1 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>

          <input
            type="text"
            placeholder="Search by job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 bg-input-field rounded-lg mb-4 text-white"
          />

          <div>
            <h3 className="text-white mb-2">Salary Range</h3>
            <Group direction="column" spacing={5}>
              <Checkbox
                label="0-3 Lakhs"
                value="0-3"
                onChange={() => handleSalaryRangeChange('0-3')}
                checked={salaryRange.includes('0-3')}
                className="text-white"
              />
              <Checkbox
                label="3-5 Lakhs"
                value="3-5"
                onChange={() => handleSalaryRangeChange('3-5')}
                checked={salaryRange.includes('3-5')}
                className="text-white"
              />
              <Checkbox
                label="5-10 Lakhs"
                value="5-10"
                onChange={() => handleSalaryRangeChange('5-10')}
                checked={salaryRange.includes('5-10')}
                className="text-white"
              />
              <Checkbox
                label="10-15 Lakhs"
                value="10-15"
                onChange={() => handleSalaryRangeChange('10-15')}
                checked={salaryRange.includes('10-15')}
                className="text-white"
              />
            </Group>
          </div>

          <div>
            <h3 className="text-white mb-2">Role</h3>
            <Group direction="column" spacing={5}>
              <Checkbox
                label="React Developer"
                value="React"
                onChange={() => handleRoleChange('React')}
                checked={roles.includes('React')}
                className="text-white"
              />
              <Checkbox
                label="MERN Stack Developer"
                value="MERN"
                onChange={() => handleRoleChange('MERN')}
                checked={roles.includes('MERN')}
                className="text-white"
              />
              <Checkbox
                label="Node.js Developer"
                value="Node.js"
                onChange={() => handleRoleChange('Node.js')}
                checked={roles.includes('Node.js')}
                className="text-white"
              />
              <Checkbox
                label="JavaScript Developer"
                value="JavaScript"
                onChange={() => handleRoleChange('JavaScript')}
                checked={roles.includes('JavaScript')}
                className="text-white"
              />
            </Group>
          </div>
        </div>

        <div className="w-3/4 pl-6">
          <div className="mb-6">
            <h1 className="text-2xl text-white font-[900]">Job Listings</h1>
            <p className="text-sm font-medium text-white">Find your next job</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">
              Available Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {jobs.length > 0 ? (
                jobs
                  .filter((job) => {
                    const salaryFilter =
                      salaryRange.length === 0 ||
                      salaryRange.some(
                        (range) =>
                          job.salary >= parseInt(range.split('-')[0]) &&
                          job.salary <= parseInt(range.split('-')[1])
                      );

                    const roleFilter =
                      roles.length === 0 ||
                      roles.some((role) => job.title.includes(role));

                    return salaryFilter && roleFilter;
                  })
                  .map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-white">No jobs found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
