import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getRole } from '../../src/lib/utils';




export const login = createAsyncThunk(
  '/login',

  async (loginData, { rejectWithValue }) => {
    console.log(loginData);
    try {
      const data = await axios.post(
        'http://localhost:3000/api/login',
        loginData 
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  token: null,
  role: getRole()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        const token = action.payload.data.data;
        const { role, id, name } = jwtDecode(token);
        state.role = role;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.loading = false
      });
  },
});

export default authSlice.reducer;
