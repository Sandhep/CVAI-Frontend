import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../slices/countSlice'; // Import the count slice
import modelReducer from '../slices/modelSlice';
import cvReducer from '../slices/cvSlice';
import jdReducer from '../slices/jdSlice';
import cvtitleReducer from '../slices/cvtitleSlice';
import authReducer from "../slices/authSlice";

const store = configureStore({
  reducer: {
    count: countReducer, // Add the count reducer to the store
    model: modelReducer,
    cv: cvReducer,
    jd: jdReducer,
    cvtitle: cvtitleReducer,
    auth: authReducer,
  },
});

export default store; 