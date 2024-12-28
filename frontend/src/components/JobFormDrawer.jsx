import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const JobFormDrawer = () => {
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
  const experienceOptions = ['Freshers', '1-2 years', '2-3 years', '3+ years'];

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('User ID not found. Please log in.');
        return;
      }

      const payload = {
        ...data,
        createdBy: userId,
        requirement: data.requirement.split(',').map((req) => req.trim()),
        salaryRange: { min: data.minSalary, max: data.maxSalary },
      };

      const response = await axios.post(
        '',
        payload
      );
      alert('Job created successfully!');
      setOpened(false);
      reset();
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    }
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Create Job</Button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a Job"
        padding="md"
        size="md"
        position="left"
        styles={{
          drawer: {
            backgroundColor: '#121212', 
            color: '#fff', 
          },
        }}
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
            {...register('companyName', {
              required: 'Company name is required',
            })}
            error={errors.companyName?.message}
          />

           <TextInput
            label="Email"
            type = 'email'
            placeholder="Enter Email"
            {...register('email', {
              required: 'email is required',
            })}
            error={errors.email?.message}
          />

           <NumberInput
              label="Phone Number"
              placeholder="Enter phone number"
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
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
            {...register('jobDescription', {
              required: 'Job description is required',
            })}
            error={errors.jobDescription?.message}
          />

          <TextInput
            label="Requirements"
            placeholder="Enter requirements (comma-separated)"
            {...register('requirement', {
              required: 'Requirements are required',
            })}
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
              {...register('minSalary', {
                required: 'Minimum salary is required',
              })}
              error={errors.minSalary?.message}
            />
            <NumberInput
              label="Max Salary"
              placeholder="Enter maximum salary"
              {...register('maxSalary', {
                required: 'Maximum salary is required',
              })}
              error={errors.maxSalary?.message}
            />
          </Group>

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Drawer>
    </>
  );
};

export default JobFormDrawer;
