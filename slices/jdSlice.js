import { createSlice } from '@reduxjs/toolkit';

const jdSlice = createSlice({
  name: 'jd',
  initialState: {
    value: [],
  },
  reducers: {
    setJD: (state, action) => {
      state.value = action.payload; 
    }
  }
});

// Export actions and reducer
export const { setJD } = jdSlice.actions;
export default jdSlice.reducer; 