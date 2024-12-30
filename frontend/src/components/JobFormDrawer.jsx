import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createJob } from '../../redux/slices/jobSlice';
import {
  Drawer,
  Button,
  TextInput,
  Textarea,
  MultiSelect,
  NumberInput,
  Select,
  Group,
} from '@mantine/core';
import axios from 'axios';
import { toast } from 'sonner';
import { getId, getToken } from '../lib/utils';
import { useDispatch } from 'react-redux';
const JobFormDrawer = () => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const employmentOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
  ];
  const experienceOptions = ['Freshers',  '1-2 years', '2-3 years', '3+ years' , '5+ year'];

  const onSubmit = (data) => {
const jobPayload  = {
  ...data , salaryRange  : {min : Number(data.minSalary) , max : Number(data.maxSalary)} , requirement : data.requirement.split(',').map((el)=>el.trim()), createdBy : getId()
 
}
 console.log(jobPayload)

 dispatch(createJob(jobPayload))
  }

 


  return (
    <>
      <div className="flex justify-end mr-5">
        <Button onClick={() => setOpened(true)}>Create Job</Button>
      </div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a Job"
        padding="md"
        size="md"
        position="right"
        style={{fontWeight:600}}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Job Title"
            placeholder="Enter job title"
            {...register('title', { required: 'Job title is required' })}
            error={errors.title?.message}
          />

          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            {...register('companyName', { required: 'Company name is required' })}
            error={errors.companyName?.message}
          />

          <TextInput
            label="Email"
            type="email"
            placeholder="Enter Email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />

          <NumberInput
            label="Phone Number"
            placeholder="Enter phone number"
            {...register('phoneNumber', { required: 'Phone number is required' })}
            error={errors.phoneNumber?.message}
          />

          <TextInput
            label="Location"
            placeholder="Enter job location"
            {...register('location', { required: 'Location is required' })}
            error={errors.location?.message}
          />

          <MultiSelect
            label="Employment Type"
            placeholder="Select employment type"
            data={employmentOptions}
            value={watch('employment') || []}
            onChange={(value) => setValue('employment', value)}
            required
          />

          <Textarea
            label="Job Description"
            placeholder="Enter job description"
            {...register('jobDescription', { required: 'Job description is required' })}
            error={errors.jobDescription?.message}
          />

          <TextInput
            label="Requirements"
            placeholder="Enter requirements (comma-separated)"
            {...register('requirement', { required: 'Requirements are required' })}
            error={errors.requirement?.message}
          />

          <Select
            label="Experience Level"
            placeholder="Select experience level"
            data={experienceOptions}
            value={watch('experience') || ''}
            onChange={(value) => setValue('experience', value)}
            required
          />

          <Group grow>
            <NumberInput
              label="Min Salary"
              placeholder="Enter minimum salary"
              {...register('minSalary', { required: 'Minimum salary is required' })}
              error={errors.minSalary?.message}
            />
            <NumberInput
              label="Max Salary"
              placeholder="Enter maximum salary"
              {...register('maxSalary', { required: 'Maximum salary is required' })}
              error={errors.maxSalary?.message}
            />
          </Group>

          <Group position="right" mt="md">
            <Button type="submit">Create Job</Button>
          </Group>
        </form>
      </Drawer>
    </>
  );
};

export default JobFormDrawer;
