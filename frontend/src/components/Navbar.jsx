import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/authSlice';
import { ChevronUp, ChevronDown } from 'lucide-react';
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await dispatch(logOut());
    navigate('/login');
  };

  const handleDropdown = () => {
    setDropdownVisible(true);
  };

  const handleLeaveDropdown = () => {
    setDropdownVisible(false);
  };
  return (
    <header className="h-16 m-3 rounded-lg drop-shadow-md px-4 sticky z-10 top-0 flex bg-dark-gray-1 items-center justify-between">
      <Link to="/" className="text-2xl ml-6 text-white font-bold">
        Job<span className="text-2xl font-bold text-red">finder</span>
      </Link>

      <div className="flex items-center justify-between gap-5">
        <nav
          onMouseEnter={handleDropdown}
          onMouseLeave={handleLeaveDropdown}
          className="relative"
        >
          <div className="flex">
            <Link
              to="/"
              className="text-md text-white hover:text-red transition-all duration-150 font-medium"
            >
              Jobs
            </Link>
            <span className="text-white">
              {dropdownVisible ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
          {dropdownVisible && (
            <div className="bg-input-field w-64 p-4 absolute top-6 rounded-lg text-white flex gap-6 ">
              <div className="flex flex-col flex-1  gap-2 text-sm">
                <Link>Jobs for React</Link>
                <Link>Jobs for Node JS</Link>
                <Link>Jobs for Python</Link>
                <Link>Jobs for Data Analytics</Link>
              </div>
              <div className="flex flex-1 flex-col gap-2 text-sm">
                <Link>Jobs in Jaipur</Link>
                <Link>Jobs in Delhi</Link>
                <Link>Jobs in Pune</Link>
                <Link>Jobs in Indore</Link>
              </div>
            </div>
          )}
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
                className="text-md hover:underline text-white transition-all duration-150 font-medium"
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
                className="text-md hover:text-red ease-in-out  text-white transition-all duration-150 font-medium"
              >
                Post a Job
              </Link>
            </nav>
            <nav>
              <Link
                to="/applicants"
                className="text-md hover:underline text-white transition-all duration-150 font-medium"
              >
                View Applicants
              </Link>
            </nav>
            <nav>
              <Link
                to="/manage-jobs"
                className="text-md hover:underline  text-white transition-all duration-150 font-medium"
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
          <span className="text-white">
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
              onClick={handleLogOut}
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
