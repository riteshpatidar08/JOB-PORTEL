import React from 'react';

const Hero = () => {
  return (
    <section className="hero text-white py-20 px-10 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-6xl sm:text-lg font-extrabold mb-4">Welcome to the Job <span className='text-red'>finder</span></h1>
        <p className="text-lg mb-2 text-gray">Connecting talent with opportunities. Your career journey starts here.</p>
        <p className="text-md">
          <span className="font-semibold">Browse thousands of job listings</span> across various industries and find the right fit. Whether you're a jobseeker or recruiter, our platform provides the tools you need for a seamless experience. <span className="font-semibold">Build your future with us today!</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
