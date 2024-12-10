import { createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: {
    value: [],
  },
  reducers: {
    setCV: (state, action) => {
      state.value = action.payload; 
    }
  }
});

// Export actions and reducer
export const { setCV } = cvSlice.actions;
export default cvSlice.reducer; 