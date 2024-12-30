import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getRole } from '../../src/lib/utils';
import { toast } from 'sonner';  

export const login = createAsyncThunk(
  '/login',
  async (loginData, { rejectWithValue }) => {
    console.log(loginData);
    try {
      const data = await axios.post('http://localhost:3000/api/login', loginData);
      return data;
    } catch (error) {
      
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  token: null,
  role: getRole(),
  toastId: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        const toastId = toast.loading('Logging in...');
        state.toastId = toastId;  
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload.data.data;
        const { role, id, name } = jwtDecode(token);
        state.role = role;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        state.loading = false;
        
      
        toast.dismiss(state.toastId); 
        toast.success('Login successful!', {
          theme: 'dark',
        });
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        toast.dismiss(state.toastId);  
        toast.error(action.payload.data.message , 'Login failed. Please try again.', {
          theme: 'dark',
        });
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
