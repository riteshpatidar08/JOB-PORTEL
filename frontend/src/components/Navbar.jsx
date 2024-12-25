import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);

  return (
    <header className="h-16 px-4 sticky z-10 top-0 flex bg-gray-alpha-1 items-center justify-between">
      <Link to="/" className="text-2xl ml-6 font-bold">
        Job<span className="text-2xl font-bold text-red">finder</span>
      </Link>

      <div className="flex items-center justify-between gap-5">
        <nav>
          <Link
            to="/"
            className="text-md hover:underline transition-all duration-150 font-medium"
          >
            Jobs
          </Link>
        </nav>

        {role === 'jobseeker' && (
          <>
            <nav>
              <Link
                to="/my-application"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                My Applications
              </Link>
            </nav>
            <nav>
              <Link
                to="/profile"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                Profile
              </Link>
            </nav>
          </>
        )}

        {role === 'recruiter' && (
          <>
            <nav>
              <Link
                to="/post-job"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                Post a Job
              </Link>
            </nav>
            <nav>
              <Link
                to="/applicants"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                View Applicants
              </Link>
            </nav>
            <nav>
              <Link
                to="/manage-jobs"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                Manage Jobs
              </Link>
            </nav>
          </>
        )}

        {role === 'admin' && (
          <>
            <nav>
              <Link
                to="/manage-users"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                Manage Users
              </Link>
            </nav>
            <nav>
              <Link
                to="/manage-jobs"
                className="text-md hover:underline transition-all duration-150 font-medium"
              >
                Manage Jobs
              </Link>
            </nav>
          </>
        )}

        {role === null &&
          location.pathname !== '/register' &&
          location.pathname !== '/login' && (
            <div className="flex gap-5">
              <Link
                to="/login"
                className="bg-red text-white px-6 py-2 rounded-full hover:bg-red-600 hover:text-white hover:scale-105  transition-all duration-200 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-red text-white px-6 py-2 rounded-full hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Register
              </Link>
            </div>
          )}

        {location.pathname === '/register' && (
          <span>
            Already Registered?{' '}
            <Link to="/login" className="text-red hover:underline">
              Login
            </Link>
          </span>
        )}

        
        {role && (
          <nav>
            <Link
              to="/logout"
              className="bg-red text-white px-8 py-2 rounded-full hover:bg-red-100 transition-all"
            >
              Logout
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
