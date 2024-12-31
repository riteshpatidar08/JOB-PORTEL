import React, { useState, useEffect } from 'react';
import { MapPin, IndianRupee, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mantine/core';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getTimeDifference = (date) => {
    const currentDate = new Date();
    const postedDate = new Date(date);
    const differenceInTime = currentDate - postedDate;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return 'today';
    } else if (differenceInDays === 1) {
      return '1 day ago';
    } else {
      return `${differenceInDays} days ago`;
    }
  };

  const postedTime = getTimeDifference(job.postedDate);

  const handleApplyClick = (e) => {
    if (!token) {
      navigate('/login');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="job-card  drop-shadow-sm hover:bg-opacity-50 cursor-pointer text-white bg-opacity-70 w-2/3 bg-dark-gray-1 p-5 mb-6 rounded-xl shadow-md relative">
        <Skeleton height={12} width={250} mb={8} />
        <Skeleton height={12} width={160} mb={8} />
        <Skeleton height={12} width={160} mb={8} />
        <Skeleton height={12} width={160} mb={8} />
        <Skeleton height={20} />
      </div>
    );
  }

  return (
    <div className="job-card  drop-shadow-sm hover:bg-opacity-50 cursor-pointer text-white bg-opacity-70 w-2/3 bg-dark-gray-1 p-5 mb-6 rounded-xl shadow-md relative">
      <span className="absolute top-3 font-semibold right-3 text-xs text-white  px-3 py-1 rounded-lg">
        {postedTime}
      </span>

      <Link
        to={`/job/${job._id}`}
        className="block text-md text-red font-bold mb-1"
      >
        {job.title}
      </Link>
      {/* <p className="flex items-center  font-semibold text-sm mb-1">
        
        {job.companyName}
      </p> */}
      <p className="flex items-center  font-semibold text-sm mb-1">
        <MapPin className="mr-2 text-gray-400" size={16} />
        {job.location}
      </p>

      <p className="flex items-center  font-semibold text-sm mb-1">
        <IndianRupee className="mr-2  text-gray-400" size={16} />
        {job.salaryRange.min} - {job.salaryRange.max}
      </p>

      <p className="flex items-center  font-semibold  text-sm mb-4">
        <Briefcase className="mr-2  text-gray-400" size={16} />
        {job.experience}
      </p>

      <div className="mt-4">
        {token ? (
          <button className="w-full bg-red-500 border hover:border-none bg-opacity-50 hover:bg-red text-white py-3 px-4 rounded-full font-medium text-sm transition duration-300">
            Apply Now
          </button>
        ) : (
          <button
            onClick={handleApplyClick}
            className="w-full border border-red-500 hover:bg-red bg-opacity-50 hover:bg-opacity-100 text-white py-3 px-4 rounded-full font-medium text-sm transition duration-300"
          >
            Login to Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
