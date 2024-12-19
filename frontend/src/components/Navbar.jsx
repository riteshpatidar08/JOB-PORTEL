import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="h-16 px-4  justify-between flex items-center bg-gray-alpha-1">
      <h1 className="text-2xl ml-6  font-bold">
        Job<span className="text-3xl font-bold text-red">Finder</span>
      </h1>

      <div className="flex items-center justify-between gap-5">
        <nav>
          <Link className="text-md hover:underline transition-all duration-150 font-semibold">
            Jobs
          </Link>
        </nav>
        <div className="flex gap-5">
          <button className="bg-red text-white px-8 py-2 rounded-full hover:bg-red-100 transition-all">
            Login
          </button>
          <Link to='/register' className="bg-red text-white px-8 py-2 rounded-full hover:bg-red-100 transition-all">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
