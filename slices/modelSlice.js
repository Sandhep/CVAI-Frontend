import { createSlice } from '@reduxjs/toolkit';

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    value: '',
  },
  reducers: {
    setModel: (state, action) => {
      state.value = action.payload; 
    }
  }
});

// Export actions and reducer
export const { setModel } = modelSlice.actions;
export default modelSlice.reducer; 