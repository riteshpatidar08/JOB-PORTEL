import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../src/lib/utils';

const initialState = {
  loading: false,
  error: null,
  jobs: [],
};

export const getJobs = createAsyncThunk(
  '/getjobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createJob = createAsyncThunk(
  '/get/createJob',
  async (jobPyload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://locahost:3000/api/createJob',
        jobPyload,
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
        (state.loading = false), (state.jobs = action.payload.data);
      })
      .addCase(getJobs.rejected, (state, action) => {
        console.log(action.payload.message);
        (state.loading = false), (state.error = action.payload.message);
      });
  },
});

console.log(jobSlice);

export default jobSlice.reducer;
