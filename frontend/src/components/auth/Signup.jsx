import React from 'react';
import { useForm } from 'react-hook-form';
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />

        <button type="submit">Register</button>

      
      </form>
    </div>
  );
}

export default Signup;




