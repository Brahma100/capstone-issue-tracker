import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import issueReducer from '../features/issue/issueSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
    issue:issueReducer,
  },
});
