"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setCount } from '../slices/countSlice'; // Import actions

const InputCard = () => {
 
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.value); // Access count from the Redux store

  const handleCountChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value) || 0); // Ensure count is a non-negative integer
    dispatch(setCount(value)); // Dispatch action to set the count
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white"> {/* Full width and styling */}
      <div className="flex items-center space-x-4 mb-1 md:mb-0"> {/* Increased space between elements, margin bottom for mobile */}
        <p className="text-lg font-bold">Top CVs</p> {/* Label for the count */}
        <button
           onClick={() => dispatch(decrement())} // Dispatch decrement action
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={handleCountChange}
          className="w-16 text-lg font-bold text-center border border-gray-300 rounded-lg" // Input box for count
        />
        <button
           onClick={() => dispatch(increment())} // Dispatch increment action
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputCard;
