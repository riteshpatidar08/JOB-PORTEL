import React, { useEffect , useState } from 'react';
import { getJobs } from '../../../redux/slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../../components/JobCard';
import { Pagination } from '@mantine/core';


function AllJobPage() {
  const dispatch = useDispatch();
  const { jobs , totalPages , totalCount} = useSelector((state) => state.job);
  const [currentPage, setCurrentPage] = useState(1)
  console.log(jobs);

  console.log(currentPage)

  useEffect(()=>{
    dispatch(getJobs(currentPage))
  },[currentPage])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);


  return <div>
      <div className="m-14">
            <h1 className="text-2xl text-white font-[900]">Job Listings</h1>
            <p className="text-sm font-medium text-white">See All Jobs Available ({`${totalCount}`})</p>
          </div>


          <div className='grid grid-cols-2 ml-20 p-6'>
             {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job.id} job={job} />)

                
              ) : (
                <p className="text-white">No jobs found</p>
              )}
          </div>

    

         <Pagination onChange={setCurrentPage} total={totalPages} color="red" size="sm" />
        
  </div>;
}

export default AllJobPage;
