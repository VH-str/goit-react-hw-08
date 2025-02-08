import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      
      .addMatcher(
        isAnyOf(register.fulfilled, logIn.fulfilled),
        (state, action) => {
          
          state.user = action.payload.user;
          state.token = action.payload.token;
          
          state.isLoggedIn = true;
        }
      )
     
      .addMatcher(isAnyOf(logOut.fulfilled), state => {
       
        state.user = { name: null, email: null };
        state.token = null;
       
        state.isLoggedIn = false;
      })
      
      .addMatcher(isAnyOf(refreshUser.pending), state => {
        
        state.isRefreshing = true;
      })
      
      .addMatcher(isAnyOf(refreshUser.fulfilled), (state, action) => {
        
        state.user = action.payload;
        
        state.isLoggedIn = true;
        
        state.isRefreshing = false;
      })
      
      .addMatcher(isAnyOf(refreshUser.rejected), state => {
      
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
