import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 0, // Initial count value
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the count
    },
    decrement: (state) => {
      state.value = Math.max(0, state.value - 1); // Decrement the count, ensuring it doesn't go below 0
    },
    setCount: (state, action) => {
      state.value = Math.max(0, action.payload); // Set the count to a specific value
    },
  },
});

// Export actions and reducer
export const { increment, decrement, setCount } = countSlice.actions;
export default countSlice.reducer; 