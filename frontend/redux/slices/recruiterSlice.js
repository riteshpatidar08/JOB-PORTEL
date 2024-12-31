import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
const initialState = {
  loading: false,
  error: null,
  jobsByCreator: [],
  toastId: null,
};

const getJobsByCreator = createAsyncThunk(
  '/getJobsByCreator',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/job/${id}/creator`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const recruiterSlice = createSlice({
  name: 'recruiter',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getJobsByCreator.pending, (state, action) => {
        state.loading = true;
        const toastId = toast.loading('fetching jobs....');
        state.toastId = toastId;
      })
      .addCase(getJobsByCreator.fulfilled, (state, action) => {
        state.loading = false;
        toast.dismiss(state.toastId);
        toast.success(action.payload.message);
        state.jobsByCreator = action.payload.data;
      });
  },
});
