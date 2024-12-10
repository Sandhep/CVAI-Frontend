import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../slices/countSlice'; // Import the count slice

const store = configureStore({
  reducer: {
    count: countReducer, // Add the count reducer to the store
  },
});

export default store; 