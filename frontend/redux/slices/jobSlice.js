import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../src/lib/utils';
import { toast } from 'sonner';  
const initialState = {
  loading: false,
  error: null,
  jobs: [],
  toastId: null,
};

export const getJobs = createAsyncThunk(
  '/getjobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createJob = createAsyncThunk(
  '/get/createJob',
  async (jobPayload, { rejectWithValue }) => {
    console.log('slice paylaod', jobPayload)
    try {
      const response = await axios.post(
        'http://localhost:3000/api/createJob',
        jobPayload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const jobSlice = createSlice({
  name: 'Job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false, 
        state.jobs = action.payload.data;
      })
      .addCase(getJobs.rejected, (state, action) => {
        console.log(action.payload.message);
        state.loading = false, 
        state.error = action.payload.data.message;
      }).addCase(createJob.pending , (state,action)=>{
        state.loading = true;
        const loadingId = toast.loading('Create job....') ;
        state.toastId = loadingId ;
      }).addCase(createJob.fulfilled , (state,action)=>{
        state.loading = false ,
       toast.dismiss(state.toastId) 
       toast.success(action.payload.message)
      }).addCase(createJob.rejected, (state, action) => {
        console.log(action.payload.message);
        state.loading = false, 
         toast.dismiss(state.toastId) 
         toast.error(action.payload?.data?.message)
        state.error = action.payload?.data?.message;
  })
  }})

console.log(jobSlice);

export default jobSlice.reducer;
