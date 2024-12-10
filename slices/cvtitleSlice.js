import { createSlice } from '@reduxjs/toolkit';

const cvtitleSlice = createSlice({
  name: 'cvtitle',
  initialState: {
    value: 'Uploaded CVs',
  },
  reducers: {
    setCVtitle: (state, action) => {
      state.value = action.payload; 
    }
  }
});

// Export actions and reducer
export const { setCVtitle} = cvtitleSlice.actions;
export default cvtitleSlice.reducer; 