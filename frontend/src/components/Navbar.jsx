import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/authSlice';
import { ChevronUp, ChevronDown } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();





  return (
    <header className="h-16 m-3 bg-opacity-50 backdrop-blur-lg rounded-lg  drop-shadow-md px-4 sticky z-10 top-0 flex bg-dark-gray-1 items-center justify-between">
      <Link to="/" className="text-2xl ml-6 text-white font-bold">
        Job<span className="text-2xl font-bold text-red">finder</span>
      </Link>

      <div className="flex items-center justify-between gap-5">
        <nav
    
          className="relative"
        >
          <div className="flex">
            <Link
              to="/"
              className="text-sm text-white hover:bg-red p-2 rounded-lg transition-all duration-150 font-medium"
            >
              Jobs
            </Link>
           
          </div>
         
        </nav>

        {role === 'jobseeker' && (
          <>
            <nav>
              <Link
                to="/my-application"
                className="text-md hover:text-red text-white transition-all duration-150 font-medium"
              >
                My Applications
              </Link>
            </nav>
            <nav>
              <Link
                to="/profile"
                className="text-md hover:text-red text-white transition-all duration-150 font-medium"
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
                className="text-sm hover:bg-red p-2  rounded-lg ease-in-out  text-white transition-all duration-150 font-medium"
              >
                Post a Job
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
                className="border border-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Register
              </Link>
            </div>
          )}

        {location.pathname === '/register' && (
          <span className="text-white">
            Already Registered?{' '}
            <Link to="/login" className="text-red hover:underline">
              Login
            </Link>
          </span>
        )}

        {role && (
          <nav>
      <ProfileDropdown role = {role}/>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
