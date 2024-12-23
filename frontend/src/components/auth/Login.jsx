import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Signup.css'; // Reusing the same styling
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
const dispatch = useDispatch()
  const onSubmit = (data) => {
    
   dispatch(login(data))
   
  };

  return (
    <div className="p-6 container max-h-[500px] overflow-y-scroll font-body shadow-md max-w-2xl mx-auto bg-gray-alpha-1 mt-10 rounded-xl">
      <div className="flex flex-col gap-1 my-6">
        <h1 className="text-sm font-semibold">
          Welcome back to <span className="text-red">JobFinder</span>
        </h1>
        <p className="text-sm font-medium text-gray-alpha">
          Please log in to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register('email', { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-full px-3 py-2"
            placeholder="Your Email"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

       
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register('password', { required: "Password is required" })}
            className="w-full border border-gray-300 rounded-full px-3 py-2"
            placeholder="Your Password"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="rememberMe" {...register('rememberMe')} />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
        </div>

        <p className="text-[11px] font-normal">
          By clicking Login, you agree to the{' '}
          <span className="text-red">Terms and Conditions</span> &{' '}
          <span className="text-red">Privacy Policy</span> of JobFinder.com
        </p>

        <button
          type="submit"
          className="w-full bg-red text-white py-2 rounded-full"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
