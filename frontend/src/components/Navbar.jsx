import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar() {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);

  console.log(role);
  console.log(location);


  return (
    <header className="h-16 px-4 sticky z-10 top-0  justify-between flex items-center bg-gray-alpha-1">
      <Link to='/' className="text-2xl ml-6  font-bold">
        Job<span className="text-2xl font-bold text-red">finder</span>
      </Link>

      <div className="flex items-center justify-between gap-5">
        <nav>
          <Link to='/' className="text-md hover:underline transition-all duration-150 font-semibold">
            Jobs
          </Link>
        </nav>

        {role === 'recruiter' ? (
          <nav>
            <Link
              to="/applicants"
              className="text-md hover:underline transition-all duration-150 font-semibold"
            >
              View Applicants
            </Link>
          </nav>
        ) : location.pathname === '/register' ? (
          <span>
            Already Registered?{' '}
            <Link to="/login" className="text-red hover:underline">
              Login
            </Link>
          </span>
        ) : (
          <div className="flex gap-5">
            {' '}
            <Link to='/login' className="bg-red text-white px-8 py-2 rounded-full cd hover:bg-red-100 transition-all">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-red text-white px-8 py-2 rounded-full hover:bg-red-100 transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
