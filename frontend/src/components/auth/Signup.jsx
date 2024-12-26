import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Slide } from 'react-awesome-reveal';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
function Signup() {
  const { register, handleSubmit, watch, reset } = useForm();
  const selectedRole = watch('role');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('role', data.role);

    // let dataPayload = {
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   phoneNumber: data.phoneNumber,
    //   role: data.role,
    // };

    if (data.role === 'jobseeker') {
      formData.append(
        'jobseeker',
        JSON.stringify({
          education: [
            {
              degree: data.degree,
              institution: data.institution,
              year: data.year,
            },
          ],
          experience: [
            {
              company: data.company,
              duration: data.duration,
              jobRole: data.jobRole,
            },
          ],
          skills: data.skills
            .split(/[ ,]+/)
            .filter((skill) => skill.trim() !== ''),
        })
      );

      formData.append('resume', data.resume[0]);
    } else if (data.role === 'recruiter') {
      formData.append(
        'recruiter',
        JSON.stringify({
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
        })
      );
    }

    console.log(formData);
    axios
      .post('http://localhost:3000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        reset();
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 container max-h-[500px]  overflow-y-scroll shadow-md max-w-2xl mx-auto bg-gray-alpha-1 mt-10 rounded-xl">
      <div className="flex flex-col gap-1 my-6">
        <h1 className="text-sm font-semibold">
          Create your <span className="text-red">JobFinder</span> profile
        </h1>
        <p className="text-sm font-medium text-gray-alpha">
          Search & apply to jobs from India's No.1 Job Site
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Fields */}

        <div className="grid grid-cols-2 text-sm md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full tex-sm focus:border-red-500 outline-none rounded-full border border-gray-300  px-3 py-2"
              placeholder="What is your name ?"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-300 rounded-full px-3 py-2"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full border border-gray-300 rounded-full px-3 py-2"
              placeholder="Your Password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber')}
              className="w-full border border-gray-300 rounded-full px-3 py-2"
              placeholder="Your Phone Number"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="text-sm">
          <label className="block text-gray-700 mb-2">Are you a ?</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('role')}
                value="jobseeker"
                className="mr-2"
              />
              Job Seeker
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('role')}
                value="recruiter"
                className="mr-2"
              />
              Recruiter
            </label>
          </div>
        </div>

        {/* Conditional Fields */}
        <div className="text-sm">
          {selectedRole === 'jobseeker' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Seeker Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6 space-y-1">
                {/* Education */}
                <div>
                  <label className="block text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    {...register('degree')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Your Degree"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    {...register('institution')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Your Institution"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    {...register('year')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Year of Graduation"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    {...register('company')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    {...register('duration')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Duration"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Job Role</label>
                  <input
                    type="text"
                    {...register('jobRole')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Job Role"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    {...register('skills')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="E.g., JavaScript, React"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Resume</label>
                  <input
                    type="file"
                    {...register('resume')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Resume Link"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedRole === 'recruiter' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Recruiter Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    {...register('companyName')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="text"
                    {...register('companyWebsite')}
                    className="w-full border border-gray-300 rounded-full px-3 py-2"
                    placeholder="Company Website"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-[11px] font-normal">
          By clicking Register, you agree to the{' '}
          <span className="text-red">Terms and Conditions</span> &{' '}
          <span className="text-red">Privacy Policy</span> of JobFinder.com
        </p>
        <button
          type="submit"
          className="w-full bg-red text-white py-2 rounded-full"
        >
          {loading ? (
            <CircularProgress sx={{ color: 'white' }} size={14} />
          ) : (
            'Register'
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;
