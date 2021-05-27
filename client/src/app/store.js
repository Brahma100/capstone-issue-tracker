import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import issueReducer from '../features/issue/issueSlice';

export const store = configureStore({
  reducer: {
  
    user:userReducer,
    issue:issueReducer,
  },
});
