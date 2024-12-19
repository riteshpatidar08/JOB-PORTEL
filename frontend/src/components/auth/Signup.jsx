import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
function Signup() {
  const { register, handleSubmit, watch } = useForm();

  const selectedRole = watch('role');
  console.log(selectedRole);

  const onSubmit = (data) => {
    console.log(data);
    let dataPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.role,
    };

    if (data.role === 'jobseeker') {
      dataPayload.jobseeker = {
        education: [
          {
            degree: data.degree,
            institution: data.institution,
            year: data.year,
          },
        ],
        experiance: [
          {
            company: data.company,
            duration: data.duration,
            jobRole: data.jobRole,
          },
        ],
        skills: data.skills.split(' '),
        resume: data.resume,
      };
    }
    console.log(dataPayload);

  axios.post('http://localhost:3000/api/register',dataPayload).then((data)=>{
    console.log(data)
  }).catch((err)=>{
    console.log(err)
  })
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
        </div>

        <div>
          <label>Password</label>
          <input type="text" {...register('password')} />
        </div>

        <div>
          <label>Phone Number</label>
          <input type="text" {...register('phoneNumber')} />
        </div>

        <div>
          <label>
            <input type="radio" {...register('role')} value="jobseeker" />
            <label>Job Seeker</label>
          </label>
          <label>
            <input type="radio" {...register('role')} value="recruiter" />
            <label>Recruiter</label>
          </label>
        </div>

        {selectedRole === 'jobseeker' && (
          <div>
            <div>
              <label>Degree</label>
              <input type="text" {...register('degree')} />
            </div>

            <div>
              <label>Institution</label>
              <input type="text" {...register('institution')} />
            </div>

            <div>
              <label>Year</label>
              <input type="number" {...register('year')} />
            </div>

            <div>
              <label>Company</label>
              <input type="text" {...register('company')} />
            </div>

            <div>
              <label>Duration (in years)</label>
              <input type="number" {...register('duration')} />
            </div>

            <div>
              <label>role</label>
              <input type="text" {...register('jobRole')} />
            </div>
            <div>
              <label>Resume</label>
              <input type="text" {...register('resume')} />
            </div>

            <div>
              <label>Skills</label>
              <input
                type="text"
                {...register('skills')}
                placeholder="eg. Javascript, React, Nodejs"
              />
            </div>
          </div>
        )}

        {selectedRole === 'recruiter' && (
          <div>
            <div>
              <label>Company Name</label>
              <input type="text" {...register('companyName')} />
            </div>

            <div>
              <label>Company Website</label>
              <input type="text" {...register('companyWebsite')} />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-red text-white px-8 py-2 rounded-full hover:bg-red-100 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
