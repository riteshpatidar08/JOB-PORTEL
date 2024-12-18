import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
   
      <header className="h-16 px-4  justify-between flex items-center bg-gray-alpha-1">
        <h1 className="text-2xl font-semibold">
          Job<span className="text-2xl font-semibold text-red">Finder</span>
        </h1>

<div className='flex  items-center justify-between gap-5'>
        <nav>
          <Link className='text-lg font-semibold'>JOBS</Link>
        </nav>
        <div className='flex gap-5'>
          <button className='bg-red text-white px-8 py-2 rounded-full'>Login</button>
          <button className='bg-red text-white px-8 py-2 rounded-full'>Register</button>
        </div>
        </div>
      </header>
  
  );
}

export default Navbar;
